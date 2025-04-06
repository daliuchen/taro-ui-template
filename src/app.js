import './app.scss'
import {Provider} from "react-redux";
import store from "./redux/store";
import {useLaunch} from '@tarojs/taro'


function App({children}) {
  useLaunch(() => {
    console.log('App launched.')
  })


  return <Provider store={store}>{children}</Provider>
}


export default App
