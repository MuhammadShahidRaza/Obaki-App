import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button} from './src/components/buttons';
import {Color} from './src/utils/color';

const {height} = Dimensions.get('screen');

function SignUp() {
  const [value, setValue] = useState('');
  const phoneInput = useRef < PhoneInput > null;
  const [formattedValue, setFormattedValue] = useState('');

  return (
    <SafeAreaView>
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
            height: height -200,
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
                Sign Up
              </Text>
              <Text style={{fontSize: 25, color: Color.BLACK}}>
                Sign up to Continue
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

            <Button
              onPress={() => {}}
              title="CONTINUE"
              containerStyle={{marginTop: 40}}
            />
          </View>
          <View style={{display: 'flex', alignItems: 'center'}}>
            <Text
              style={{fontSize: 16, color: Color.BLACK, marginVertical: 10}}>
              By Creating the account you agree the
            </Text>
            <TouchableOpacity>
              <Text style={{fontSize: 18, color: Color.ORANGE}}>
                Terms of use.
              </Text>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
                marginVertical: 30,
              }}>
              <Text style={{fontSize: 18, color: Color.BLACK}}>
                I already have an account
              </Text>

              <TouchableOpacity>
                <Text
                  style={{fontSize: 18, color: Color.ORANGE, marginLeft: 8}}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <TouchableOpacity>
                  <Image
                    source={require('./src/assets/images/googlelogo.png')}
                    style={{width: 60, height: 60}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 6}}>
                <TouchableOpacity>
                  <Image
                    source={require('./src/assets/images/facebooklogo.png')}
                    style={{width: 80, height: 80}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity>
                <View
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 60,
                    borderColor: 'lightGrey',
                    borderWidth: 0.5,

                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Entypo
                    name="dots-three-horizontal"
                    color={Color.BLACK}
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
