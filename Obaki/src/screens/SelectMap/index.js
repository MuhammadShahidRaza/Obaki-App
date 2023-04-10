import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  // PermissionsAndroid,
} from 'react-native';
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Color } from '../../utils/color';
import BackButton from '../../components/backButton';
import { Input } from '../../components/inputs';
import { Button } from '../../components/buttons';
import { showToast } from '../../utils/Toast';
import { StackActions } from '@react-navigation/native';

const { width, height, scale } = Dimensions.get('screen');

const SelectMap = ({ navigation,route }) => {
  const [address, setAddress] = useState('');
  return (
    <SafeAreaView style={{ height: height, backgroundColor: Color.WHITE }}>
      <ScrollView>
        <BackButton navigation={navigation} />
        <View style={{ marginHorizontal: 20 }}>
          <Input
            onChangeText={setAddress}
            value={address}
            placeholder="Search for area, street name.."
            containerStyle={{ elevation: 10 }}
          />
          <TouchableOpacity>
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 15,
                elevation: 2,
                marginVertical: 20,
              }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <View style={{ display: 'flex' }}>
                  <MaterialIcons
                    name="gps-fixed"
                    color={Color.GREY}
                    size={25}
                  />
                </View>
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ fontSize: 18, color: Color.BLACK }}>
                    Get Current Location
                  </Text>
                  <Text style={{}}>Using GPS</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <Button
            containerStyle={{
              backgroundColor: Color.BLACK,

              marginVertical: 30,
            }}
            onPress={() => {


              
              if (address) {

if(route?.params?.fromProperty){
  navigation.dispatch(
    StackActions.replace('Property', {
      address: address,
    })
  );
  return
}
else{

                navigation.dispatch(
                  StackActions.replace('OwnHouse', {
                    address: address,
                  })
                );
              }}
              else {
                showToast({
                  type: "error",
                  message: "Enter your address to proceed."
                });
              }
            }}
            title="FINISHED"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SelectMap;
