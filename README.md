# taro-ui-template


# Taro UI Template

一个基于 Taro + Redux 的小程序开发模板，集成了常用的开发配置和最佳实践。

## 特性

- 🚀 基于 Taro 4.x 最新版本开发
- 📦 集成 Redux 状态管理方案
- 🎨 集成 Taro UI 组件库
- 🔄 分包加载配置
- 📝 常用组件模板代码
- 🎯 开箱即用的项目结构

## 项目结构

```
easy-english-front/
├── config/                     # Taro 配置目录
│   ├── dev.js                  # 开发环境配置
│   ├── index.js                # 基础配置
│   └── prod.js                 # 生产环境配置
├── dist/                       # 编译后的文件
├── src/                        # 源代码目录
│   ├── api/                    # API 接口层
│   │   └── counterApi.js       # Counter API 示例
│   ├── assets/                 # 静态资源文件
│   │   └── tab_bar/            # Tab 栏图标资源
│   ├── components/             # 全局公共组件
│   │   └── Card/               # 卡片组件
│   ├── extensions/             # 扩展功能
│   │   ├── request.js          # 网络请求封装
│   │   └── toast.js            # Toast 提示封装
│   ├── packages/               # 分包目录
│   ├── pages/                  # 页面目录
│   │   ├── home/               # 首页
│   │   ├── index/              # 入口页
│   │   └── my/                 # 我的页面
│   ├── redux/                  # Redux 状态管理
│   │   ├── slices/             # Redux Toolkit slices
│   │   │   └── countSlice.js   # Counter 状态切片示例
│   │   └── store.js            # Redux store 配置
│   ├── app.config.js           # 全局配置
│   ├── app.js                  # 入口文件
│   ├── app.scss                # 全局样式
│   └── index.html              # H5 入口 HTML
├── .editorconfig               # 编辑器配置
├── .env.development            # 开发环境变量
├── .env.production             # 生产环境变量
├── .env.test                   # 测试环境变量
├── .eslintrc                   # ESLint 配置
├── babel.config.js             # Babel 配置
├── jsconfig.json               # JavaScript 配置
├── package.json                # 项目依赖和脚本
└── project.config.json         # 小程序项目配置
```

