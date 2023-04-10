import React, { useRef, useState } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from '../../components/buttons';
import { Input } from '../../components/inputs';
import { Color } from '../../utils/color';
import Entypo from 'react-native-vector-icons/Entypo';
import { BASE_URL } from '../../constants/keys';
import axios from 'axios';
import { showToast } from '../../utils/Toast';
import { isEmpty } from '../../utils/helper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SaveItemToStorage } from '../../utils/storage';


const { height } = Dimensions.get('screen');

function SignIn({ navigation }) {
  const [value, setValue] = useState('');
  const phoneInput = useRef < PhoneInput > null;
  const [formattedValue, setFormattedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');


  async function signInUserWithPhone() {
    if (isEmpty(password) || isEmpty(formattedValue)) {
      showToast({
        type: "error",
        message: "Please Fill All the Feilds"
      });
      return
    }


    if (password.length >= 8) {

      if (formattedValue.length >= 12 && formattedValue.length <= 14) {
        const body = {
          "phone": formattedValue,
          "password": password
        }
        try {
          const response = await axios.post(`${BASE_URL}/login`, body);
          const result = response.data;

          if (result) {
            const token = result.message.token
            const userID = result.message._id
            SaveItemToStorage("TOKEN", token)
            SaveItemToStorage("USER_ID", userID)
            showToast({
              type: "success",
              message: "Successfully Login"
            });
            navigation.replace("Home");
          }

          return
        } catch (errors) {
          console.log(errors.response.data)
          const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message;
          showToast({
            type: "error",
            message: Error
          });
        }
      }
      else {
        showToast({
          type: "error",
          message: "Please Enter Valid Number"
        });
      }
    }
    else {
      showToast({
        type: "error",
        message: "Password should not be less tha 8 digits."
      });

    }
  };



//   setTimeout(() => {
//     setSnackBar(false);
//     setErrorMessage("");
//   }, 3000);
// }


// if (isLoading) {
//   return (
//     <View
//       style={{
//         width: "100%",
//         height: "100%",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         backgroundColor: "white",
//       }}
//     >
//       <ActivityIndicator size="large" color="blue" />
//     </View>
//   );
// }


  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: Color.ORANGE,
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{ position: 'absolute', right: 25, top: 35 }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Home');
              }}
            >
              <Text style={{ fontSize: 22, color: Color.WHITE }}>Skip</Text>
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
          <View style={{ marginHorizontal: 20 }}>
            <View
              style={{
                marginTop: 50,
                marginBottom: 30,
              }}>
              <Text
                style={{ fontWeight: 'bold', fontSize: 25, color: Color.BLACK }}>
                Sign In
              </Text>
              <Text style={{ fontSize: 25, color: Color.BLACK }}>
                Sign In to Continue
              </Text>
            </View>
            <View>
              <Text
                style={{ marginBottom: 15, color: Color.BLACK, fontWeight: 500 }}>
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
                countryPickerButtonStyle={{ backgroundColor: Color.WHITE }}
                containerStyle={{ width: '100%' }}
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
                signInUserWithPhone()
              }}
              title="CONTINUE"
              containerStyle={{ marginTop: 40 }}
            />
          </View>
          {/* <View style={{display: 'flex', alignItems: 'center'}}> */}

          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <Text style={{ fontSize: 18, color: Color.BLACK }}>
              Don't have an account?
            </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('SignUp');
              }}>
              <Text style={{ fontSize: 18, color: Color.ORANGE, marginLeft: 8 }}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 40,
            alignItems: 'center',
          }}>
          <View>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/googlelogo.png')}
                style={{ width: 60, height: 60 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 6 }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/images/facebooklogo.png')}
                style={{ width: 80, height: 80 }}
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
                setModalVisible(false);
                navigation.navigate('SignUpWithEmail', {
                  isFromsignIn: true
                });
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

export default SignIn;
