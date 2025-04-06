import {  Toast } from '@nutui/nutui-react-taro'
import {LogisticsError} from "@nutui/icons-react-taro";

export function showExceptionToast(msg="",duration=1){
  Toast.show('exception', {
    title: '出错啦',
    content: msg,
    type: 'fail',
    duration: duration,
    position: 'center',
    icon: <LogisticsError />,
    lockScroll: true
  })
}
