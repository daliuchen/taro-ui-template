import {View} from "@tarojs/components";
import styles from './Card.module.scss'

export default function Card({title, children}) {
  return <View className={styles.main}>
    <View className={styles.title}>{title}</View>
    {children}
  </View>
}
