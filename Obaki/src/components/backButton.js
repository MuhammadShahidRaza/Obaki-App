import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color } from '../utils/color';

const BackButton = ({navigation}) => {
  return (
    <TouchableOpacity
    onPress={() => {
      navigation.pop();
    }}>
    <View style={{marginHorizontal: 20, marginVertical: 20}}>
      <Ionicons name="arrow-back" color={Color.BLACK} size={40} />
    </View>
  </TouchableOpacity>
  )
}

export default BackButton