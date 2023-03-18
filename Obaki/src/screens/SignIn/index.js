import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button} from '../../components/buttons';
import {Input} from '../../components/inputs';
import {Color} from '../../utils/color';

const {height} = Dimensions.get('screen');

function SignIn({navigation}) {
  const [value, setValue] = useState('');
  const phoneInput = useRef < PhoneInput > null;
  const [formattedValue, setFormattedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: 'white',height:height}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: Color.ORANGE,
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{position: 'absolute', right: 25, top: 35}}>
            <TouchableOpacity>
              <Text style={{fontSize: 22, color: Color.WHITE}}>Skip</Text>
            </TouchableOpacity>
          </View>
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
                Sign In
              </Text>
              <Text style={{fontSize: 25, color: Color.BLACK}}>
                Sign In to Continue
              </Text>
            </View>
            <View>
              <Text
                style={{marginBottom: 15, color: Color.BLACK, fontWeight: 500}}>
                Mobile Number
              </Text>
              <PhoneInput
                useRef={phoneInput}
                defaultValue={value}
                defaultCode="IN"
                layout="first"
                onChangeText={text => {
                  setValue(text);
                }}
                textContainerStyle={{
                  backgroundColor: 'white',
                }}
                textInputStyle={{
                  padding: 0,
                }}
                countryPickerButtonStyle={{backgroundColor: Color.WHITE}}
                containerStyle={{width: '100%'}}
                onChangeFormattedText={text => {
                  setFormattedValue(text);
                }}
                withDarkTheme
                withShadow
                autoFocus
              />
            </View>

            <Input
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
            />

            <Button
              onPress={() => {
                navigation.navigate('OptVerification');
              }}
              title="CONTINUE"
              containerStyle={{marginTop: 40}}
            />
          </View>
          {/* <View style={{display: 'flex', alignItems: 'center'}}> */}

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginVertical: 20,
            }}>
            <Text style={{fontSize: 18, color: Color.BLACK}}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={{fontSize: 18, color: Color.ORANGE, marginLeft: 8}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default SignIn;
