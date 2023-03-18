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

function SignUp({navigation}) {
  const [value, setValue] = useState('');
  const phoneInput = useRef < PhoneInput > null;
  const [formattedValue, setFormattedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={{backgroundColor: 'white'}}>
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
            <TouchableOpacity 
            onPress={()=>{
              navigation.navigate("Home")
            }}
            >
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

              <TouchableOpacity 
               onPress={() => {
                navigation.navigate('SignIn');
              }}
              >
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
                    source={require('../../assets/images/googlelogo.png')}
                    style={{width: 60, height: 60}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{marginHorizontal: 6}}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/facebooklogo.png')}
                    style={{width: 80, height: 80}}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.4)',
            flex: 1,
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}
            style={{
              width: 65,
              height: 65,
              backgroundColor: Color.BLACK,
              borderRadius: 65,
              bottom: -30,
              zIndex: 1,
              left: 160,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View>
              <Entypo name="cross" color={Color.WHITE} size={32} />
            </View>
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: 'white',
              paddingHorizontal: 20,
              paddingVertical: 30,
              height: 350,
              borderColor: Color.BLACK,
              borderWidth: 3,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
            }}>
            <TouchableOpacity
             onPress={() => {
              navigation.navigate('SignUpWithEmail');
            }}
            >
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 20,
                  elevation: 0.5,
                  paddingVertical: 10,
                  borderColor: Color.GREY,
                  flexDirection: 'row',
                }}>
                <MaterialCommunityIcons
                  name="email"
                  color={Color.BLACK}
                  size={28}
                />
                <Text
                  style={{
                    marginLeft: 10,
                    color: Color.BLACK,
                    fontSize: 17,
                    fontWeight: 500,
                  }}>
                  Continue With Email
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default SignUp;
