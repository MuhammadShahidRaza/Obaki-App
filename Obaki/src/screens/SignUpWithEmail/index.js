import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { Button } from '../../components/buttons';
import { Input } from '../../components/inputs';
import { Color } from '../../utils/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { BASE_URL } from '../../constants/keys';
import axios from 'axios';
import { showToast } from '../../utils/Toast';
import { isEmpty, isEmail } from '../../utils/helper';
import { SaveItemToStorage } from '../../utils/storage';

const { height } = Dimensions.get('screen');

function SignUpWithEmail({ navigation, route }) {
  const { isFromsignIn } = route.params;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  async function signUpUser() {
    if (isEmpty(password) || isEmpty(email)) {
      showToast({
        type: "error",
        message: "Please Fill All the Feilds"
      });
      return
    }


    if (password.length >= 8) {
      if (isEmail(email)) {
        const body = {

          "email": email,
          "password": password

        }

        try {
          const response = isFromsignIn ? await axios.post(`${BASE_URL}/login`, body) :
            await axios.post(`${BASE_URL}/user`, body);
          const result = response.data;



          if (result) {
            // SaveItemToStorage("userEmail" , email)
            // SaveItemToStorage("userEmailPassword" , password)
            const token = result?.message?.token
            const userID = result?.message?._id

            if (token && userID) {


              SaveItemToStorage("TOKEN", token)
              SaveItemToStorage("USER_ID", userID)
            }

            isFromsignIn ?

              navigation.navigate('EnterName', {
                email: email,
                password: password,
                phone: ''
              }) :

              navigation.navigate('SignIn');
            showToast({
              type: "success",
              message: isFromsignIn ? "Login Successfully" : result?.message
            });
          }


        } catch (errors) {

          const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message
          showToast({
            type: "error",
            message: Error
          });
        }

      }
      else {
        showToast({
          type: "error",
          message: "Please Enter Valid Email"
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

  return (
    <SafeAreaView style={{ backgroundColor: Color.WHITE, height: height }}>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              marginVertical: 60,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.pop();
              }}>
              <AntDesign name="arrowleft" color={Color.BLACK} size={27} />
            </TouchableOpacity>

            <Text
              style={{
                color: Color.BLACK,
                fontSize: 18,
                marginLeft: 15,
                fontWeight: 500,
              }}>
              Continue With Email
            </Text>
          </View>
          <View style={{ height: 350 }}>
            <Input onChangeText={setEmail} value={email} placeholder="Email" />
            <Input
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
            />
          </View>

          <View>
            <Button
              onPress={() => {
                signUpUser()
                // navigation.navigate('SignIn');
              }}
              title="CONTINUE"
              containerStyle={{ marginTop: 0 }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignUpWithEmail;
