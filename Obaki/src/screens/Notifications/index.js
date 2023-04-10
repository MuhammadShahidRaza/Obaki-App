import { View, Text } from 'react-native'
import {Color} from '../../utils/color';
import React from 'react'

const Notifications = () => {
  return (
    <View style={{backgroundColor:Color.ORANGE,display:"flex",alignItems:"center",justifiContent:"center"}}>
      <Text style={{fontSize:22,color:Color.BLACK}}>Screen </Text>
    </View>
  )
}

export default Notifications