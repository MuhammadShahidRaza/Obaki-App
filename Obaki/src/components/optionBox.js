import {Dimensions, View, Text ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import { Color } from '../utils/color'

const {width} = Dimensions.get('window');

const OptionBox = ({image,title,onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <View
      style={{
        borderWidth: 1,
        borderRadius: 20,
        borderColor: Color.BLACK,
        width: width - 100,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 20,
        marginTop: 20,
        backgroundColor: Color.WHITE,
        display: 'flex',
        alignItems: 'center',
      }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 20,
          color:Color.GREY,
          textAlign: 'center',
        }}>
       {title}
      </Text>
      <Image
        source={image}
        resizeMode={"contain"}
        style={{width: 120, height: 100}}
      />
    </View>
    </TouchableOpacity>
  )
}

export default OptionBox