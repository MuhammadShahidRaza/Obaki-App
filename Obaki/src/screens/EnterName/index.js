import React, { useState } from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Button } from '../../components/buttons';
import { Input } from '../../components/inputs';
import { Color } from '../../utils/color';
import CountryPicker from 'react-native-country-picker-modal';
import { showToast } from '../../utils/Toast';
import axios from 'axios';
import { BASE_URL } from '../../constants/keys';
import { SaveItemToStorage } from '../../utils/storage';

const { height } = Dimensions.get('screen');

function EnterName({ navigation, route }) {
  const { phone, password, email } = route.params;
  const [name, setName] = useState('');
  const [country, setCountry] = useState(null);
  const [openCountryModal, setOpenCountryModal] = useState(false);

  const onSelect = country => {
    setCountry(country);
  };



  async function addDetails_SignIn() {
    if (name && country?.name) {



      const body = phone ? {
        "phone": phone,
        "password": password
      } :
        {
          "email": email,
          "password": password
        };

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
            message: `Welcome ${name}`,
          });
          navigation.replace("Home");
        }

        return
      } catch (errors) {
        console.log(errors.response.data)
        // const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message;
        // showToast({
        //   type: "error",
        //   message: Error
        // });
      }
    }
    else {
      showToast({
        type: "error",
        message: "Please Fill All the Feilds"
      });
    }

  }




  return (
    <SafeAreaView style={{ backgroundColor: Color.WHITE, height: height }}>
      <ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <View
            style={{
              marginVertical: 60,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: Color.BLACK,
                fontSize: 18,
                marginLeft: 15,
                fontWeight: 500,
              }}>
              Tell us your name
            </Text>
          </View>
          <View style={{ height: 350 }}>
            <Input
              onChangeText={setName}
              value={name}
              placeholder="Enter Name"
            />

            <View>
              <Text
                style={{
                  color: Color.BLACK,
                  fontSize: 20,
                  fontWeight: 900,
                  marginTop: 30,
                }}>
                Choose Your Country
              </Text>

              {/* <TouchableOpacity
                style={{
                  elevation: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  backgroundColor:"white",
                  paddingVertical: 6,
                  paddingHorizontal: 10,
                  marginVertical: 15,
                }}>
                <CountryPicker
                  placeholder=""
                  {...{
                    onSelect,
                  }}
                  visible
                />
                <Text style={{color: Color.BLACK, fontSize: 16, bottom: 10}}>
                  {country?.name }
                </Text>
              </TouchableOpacity> */}
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setOpenCountryModal(!openCountryModal);
                  }}
                  style={{
                    elevation: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    backgroundColor: 'white',
                    paddingVertical: 6,
                    paddingHorizontal: 10,
                    marginVertical: 10,
                  }}>
                  <CountryPicker
                    placeholder={''}
                    {...{
                      onSelect,
                    }}
                    withFilter
                    visible={openCountryModal}
                  />
                  <Text
                    style={{
                      color: country?.name ? Color.BLACK : Color.GREY,
                      fontSize: 16,
                      bottom: 10,
                    }}>
                    {country?.name ? country?.name : 'Country'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <Button
              onPress={() => {

                addDetails_SignIn()

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

export default EnterName;
