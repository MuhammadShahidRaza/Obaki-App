import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../components/buttons';
import {Input} from '../../components/inputs';
import {Color} from '../../utils/color';

const {height} = Dimensions.get('screen');

function OptVerification({navigation}) {
  const [value, setValue] = useState('');
  const phoneInput = useRef < PhoneInput > null;
  const [formattedValue, setFormattedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: 'white', height: height}}>
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
            <AntDesign name="lock" color={Color.BLACK} size={58} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.WHITE,
            borderTopRightRadius: 50,
            borderTopStartRadius: 50,
            top: -50,
          }}>
          <View style={{marginHorizontal: 20}}>
            <View
              style={{
                marginTop: 50,
                marginBottom: 30,
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 25, color: Color.BLACK}}>
                Easy Peasy
              </Text>
              <Text style={{fontSize: 17, color: Color.BLACK}}>
                Please enter the 6 Digit code we sent you via mobile to continue
              </Text>
            </View>

            <View style={{marginVertical:20}}>{/* OPT Boxes */}</View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Text
                  style={{color: Color.ORANGE, fontSize: 18, fontWeight: 500}}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>

            <Button
             onPress={()=>{
              navigation.navigate("Home")
            }}
              title="LET'S GO!"
              containerStyle={{marginTop: 20}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default OptVerification;
