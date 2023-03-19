import React from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Color } from '../../utils/color';

const {height} = Dimensions.get('screen');

function BackgroundAuth({childrens}) {
  return (
    <SafeAreaView style={{backgroundColor:"white"}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: Color.ORANGE,
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              borderRadius: 100,
              backgroundColor: '#fcad03',
              top: -20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <AntDesign name="user" color={Color.BLACK} size={58} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.WHITE,
            // height: height -200,
            borderTopRightRadius: 50,
            borderTopStartRadius: 50,
            top: -50,
          }}>
          <View style={{marginHorizontal: 20}}>
          {childrens}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default BackgroundAuth;
