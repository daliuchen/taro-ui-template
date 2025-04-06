import {View, Text, Button} from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import './index.scss'
import {useDispatch, useSelector} from "react-redux";
import {decrement, decrementAsync, increment, incrementAsync} from "@/slices/countSlice";
import { AtButton } from 'taro-ui'

export default function Index () {
  const dispatch = useDispatch()
  const {count,loading} = useSelector(state => state.counter)
  useLoad(() => {
    console.log('Page loaded.')
  })

  const onClickGoToSubpackage = (e) => {
    console.log('onClickGoToSubpackage', e)
    Taro.navigateTo({
      url: '/packages/hello/hello'
    })
  }

  const onClickSyncPlus = () => {
    dispatch(increment(1))
  }
  const onClickSyncMinus = () => {
    dispatch(decrement(1))
  }
  const onClickAsyncPlus = () => {
    dispatch(incrementAsync(1))
  }
  const onClickAsyncMinus = () => {
    dispatch(decrementAsync(1))
  }

  return (
    <View className='index'>
      <Text>Welcome to Taro!</Text>
      <Text>redux</Text>
      <View>
        <AtButton type='primary' onClick={onClickSyncPlus}>sync +</AtButton>
        <Text>{count}</Text>
        <Button onClick={onClickSyncMinus}>sync -</Button>
        {
          loading ? <Text>loading...</Text> : null
        }
        <Button onClick={onClickAsyncPlus}>async +</Button>
        <Button onClick={onClickAsyncMinus}>async -</Button>
      </View>

      <View>
        <Button onClick={onClickGoToSubpackage}>click me go to subpackage</Button>
      </View>
    </View>
  )
}
