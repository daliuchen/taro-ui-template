import Taro from '@tarojs/taro';
import { Toast } from '@nutui/nutui-react-taro';

// 基础URL配置
const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'https://api-dev.your-domain.com' 
  : 'https://api.your-domain.com';

// 请求超时时间
const TIMEOUT = 10000;

// 请求拦截器
const requestInterceptor = (chain) => {
  const requestParams = chain.requestParams;

  // 添加token到header
  const token = Taro.getStorageSync('token');
  if (token) {
    requestParams.header = {
      ...requestParams.header,
      'Authorization': `Bearer ${token}`
    };
  }

  return chain.proceed(requestParams);
};

// 响应拦截器
const responseInterceptor = (chain) => {
  const requestParams = chain.requestParams;
  
  return chain.proceed(requestParams).then(res => {
    // 处理HTTP状态码
    if (res.statusCode >= 200 && res.statusCode < 300) {
      return res.data;
    } else {
      const error = new Error(`Network error: ${res.statusCode}`);
      error.response = res;
      throw error;
    }
  });
};

// 添加拦截器
Taro.addInterceptor(requestInterceptor);
Taro.addInterceptor(responseInterceptor);

/**
 * 基础请求方法
 * @param {string} url - 请求路径
 * @param {object} data - 请求数据
 * @param {string} method - 请求方法
 * @param {object} header - 请求头
 * @returns {Promise} - 返回Promise
 */
export function request(url, data = {}, method = 'GET', header = {}) {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  
  return new Promise((resolve, reject) => {
    Taro.request({
      url: fullUrl,
      data,
      method,
      header: {
        'Content-Type': 'application/json',
        ...header
      },
      timeout: TIMEOUT,
      success: (res) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(res.data);
        } else {
          handleRequestError(res);
          reject(res);
        }
      },
      fail: (err) => {
        handleRequestError(err);
        reject(err);
      }
    });
  });
}

/**
 * 处理请求错误
 * @param {object} error - 错误对象
 */
function handleRequestError(error) {
  let message = '网络请求失败，请稍后重试';
  
  if (error.statusCode === 401) {
    message = '登录已过期，请重新登录';
    // 可以在这里处理登录过期逻辑，如跳转登录页
    Taro.navigateTo({ url: '/pages/login/index' });
  } else if (error.statusCode === 403) {
    message = '没有权限访问';
  } else if (error.statusCode === 404) {
    message = '请求的资源不存在';
  } else if (error.statusCode === 500) {
    message = '服务器内部错误';
  } else if (error.errMsg) {
    message = error.errMsg;
  } else if (error.data && error.data.message) {
    message = error.data.message;
  }
  
  Toast.show({
    content: message,
    icon: 'fail'
  });
}

/**
 * 流式请求方法
 * @param {string} url - 请求路径
 * @param {object} data - 请求数据
 * @param {string} method - 请求方法
 * @param {function} onChunkReceived - 每次接收到数据块时的回调
 * @param {function} onError - 错误回调
 * @param {function} onSuccess - 成功回调
 * @returns {Promise} - 返回Promise
 */
export function streamRequest(url, data = {}, method = 'POST', onChunkReceived, onError = null, onSuccess = null) {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const token = Taro.getStorageSync('token');
  
  return new Promise((resolve, reject) => {
    const requestTask = Taro.request({
      url: fullUrl,
      data,
      method,
      header: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      responseType: 'text',
      enableChunked: true,
      timeout: 60000, // 流请求通常需要更长的超时时间
      success: (res) => {
        if (onSuccess) onSuccess(res);
        resolve(res);
      },
      fail: (err) => {
        if (onError) onError(err);
        handleRequestError(err);
        reject(err);
      }
    });

    // 监听数据接收
    requestTask.onChunkReceived((res) => {
      try {
        if (onChunkReceived) {
          onChunkReceived(res.data);
        }
      } catch (e) {
        console.error('Error processing chunk:', e);
      }
    });
  });
}

/**
 * GET请求
 * @param {string} url - 请求路径
 * @param {object} data - 请求参数
 * @param {object} header - 请求头
 * @returns {Promise} - 返回Promise
 */
export function get(url, data = {}, header = {}) {
  return request(url, data, 'GET', header);
}

/**
 * POST请求
 * @param {string} url - 请求路径
 * @param {object} data - 请求数据
 * @param {object} header - 请求头
 * @returns {Promise} - 返回Promise
 */
export function post(url, data = {}, header = {}) {
  return request(url, data, 'POST', header);
}

/**
 * PUT请求
 * @param {string} url - 请求路径
 * @param {object} data - 请求数据
 * @param {object} header - 请求头
 * @returns {Promise} - 返回Promise
 */
export function put(url, data = {}, header = {}) {
  return request(url, data, 'PUT', header);
}

/**
 * DELETE请求
 * @param {string} url - 请求路径
 * @param {object} data - 请求数据
 * @param {object} header - 请求头
 * @returns {Promise} - 返回Promise
 */
export function del(url, data = {}, header = {}) {
  return request(url, data, 'DELETE', header);
}

/**
 * 上传文件
 * @param {string} url - 请求路径
 * @param {string} filePath - 文件路径
 * @param {string} name - 文件对应的 key
 * @param {object} formData - 额外的表单数据
 * @param {function} onProgress - 上传进度回调
 * @returns {Promise} - 返回Promise
 */
export function uploadFile(url, filePath, name = 'file', formData = {}, onProgress = null) {
  const fullUrl = url.startsWith('http') ? url : `${BASE_URL}${url}`;
  const token = Taro.getStorageSync('token');
  
  return new Promise((resolve, reject) => {
    const uploadTask = Taro.uploadFile({
      url: fullUrl,
      filePath,
      name,
      formData,
      header: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      },
      success: (res) => {
        try {
          const data = JSON.parse(res.data);
          resolve(data);
        } catch (e) {
          resolve(res.data);
        }
      },
      fail: (err) => {
        handleRequestError(err);
        reject(err);
      }
    });
    
    if (onProgress) {
      uploadTask.onProgressUpdate((res) => {
        onProgress(res.progress);
      });
    }
  });
}

// 导出默认对象
export default {
  request,
  streamRequest,
  get,
  post,
  put,
  del,
  uploadFile
};
