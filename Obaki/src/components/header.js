import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Color } from '../utils/color'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { useDrawerStatus } from '@react-navigation/drawer';

const Header = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <View style={{ height: 150, backgroundColor: Color.ORANGE }}>
        <TouchableOpacity onPress={() => {
          navigation.openDrawer()
        }}>

          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Ionicons
              name="reorder-three-outline"
              color={Color.WHITE}
              size={40}
            />
          </View>
        </TouchableOpacity>
      </View>
      <Text></Text>
    </SafeAreaView>
  )
}

export default Header