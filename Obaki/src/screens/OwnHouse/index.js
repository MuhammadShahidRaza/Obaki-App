import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  PermissionsAndroid,
  Image,
  Alert,
  // PermissionsAndroid,
} from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../utils/color';
import BackButton from '../../components/backButton';
import { Input } from '../../components/inputs';
import { IsIOS, isEmpty } from '../../utils/helper';
import PickImage from '../../components/pickImage';
import { Button } from '../../components/buttons';
// import {launchCamera} from 'react-native-image-picker';
import { showToast } from '../../utils/Toast';
import { GetItemFromStorage } from '../../utils/storage';
import axios from 'axios';
import { BASE_URL } from '../../constants/keys';
import ImagePicker from 'react-native-image-crop-picker';
import { StackActions } from '@react-navigation/native';


const { width, height, scale } = Dimensions.get('screen');

const OwnHouse = ({ navigation, route }) => {
  const [locationName, setLocationName] = useState('');

  const [stateProvince, setStateProvince] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [experience, setExperience] = useState(0);
  const [place, setPlace] = useState('House');

  const [placeImage, setPlaceImage] = useState('');

  const imageOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  async function imagePicker() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        `${place.toLowerCase()} Image`,
        "Please select a image from camera or gallery",
        [
          {
            text: "Use Camera",
            onPress: () => {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                // includeBase64: true,
              }).then(image => {
                // setPlaceImageBase64(image?.data)
                setPlaceImage(image?.path);

              });
            },
          },
          {
            text: "Use Media",
            onPress: () => {
              ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                // includeBase64: true,

              }).then(image => {
                // setPlaceImageBase64(image?.data)
                setPlaceImage(image?.path);

              });
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }
  const isHouse = place === 'House';

  async function addHouse() {

    if (isEmpty(locationName) || isEmpty(route?.params?.address) || isEmpty(stateProvince)
      //  || experience === 0
      || isEmpty(zipCode) || isEmpty(city)) {
      showToast({
        type: "error",
        message: "Please Fill All The Feilds."
      });
      return;
    }

    else {
      const body =
      {
        "isHouse": isHouse,
        "location": locationName,
        "address": route?.params?.address,
        "city": city,
        "state": stateProvince,
        "zipCode": zipCode,
        "image": "https://placeimg.com/640/480/arch"

      }

      const token = await GetItemFromStorage("TOKEN")
      try {
        const response = await axios.post(`${BASE_URL}/restaurantHouse`, body,
          {
            headers: {
              'token': token,
              'Authorization': 'Bearer ' + token,
              'Content-Type': 'application/json'
            }
          }
        );
        const result = response.data;
        if (result) {
          const response1 = await axios.get(`${BASE_URL}/restaurantHouse`,
            {
              headers: {
                'token': token,
                'Authorization': 'Bearer ' + token,
              }
            }
          );
          const result1 = response1.data;
          if (result1) {
            showToast({
              type: "success",
              message: `${place.toUpperCase()} Added Successfully`
            });
            navigation.dispatch(
              StackActions.replace('RegisterChef', {
                resturantOrHouseId: `${result1?.data?._id}`,
              })
            );
          }
          return
        }
        return
      } catch (errors) {
        console.log(errors.response.data)

        if (errors.response.data === "A token is required for authentication") {
          showToast({
            type: "error",
            message: "Please Sign In to proceed."
          });
          return;
        }


        const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message;
        showToast({
          type: "error",
          message: Error
        });
      }
    }
  }











  return (
    <SafeAreaView >
      <ScrollView>
        <View style={{ backgroundColor: Color.WHITE }}>
          <BackButton navigation={navigation} />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              marginVertical: 10,
              marginHorizontal: 20,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              onPress={() => {
                setPlace('House');
              }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyCenter: 'center',
                  width: 155,
                  paddingHorizontal: 5,
                  paddingVertical: 15,
                  borderWidth: 1,
                  borderColor: Color.BLACK,
                  backgroundColor: Color.LIGHT_GREY,
                  borderRadius: 15,
                }}>
                <View>
                  <FontAwesome5
                    name="house-user"
                    color={Color.GREY}
                    size={25}
                  />
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontSize: 20, color: Color.BLACK }}>House</Text>
                </View>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: isHouse ? Color.GREEN : Color.WHITE,
                    borderWidth: 1,
                    borderColor: Color.BLACK,
                  }}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPlace('Resturant');
              }}>
              <View
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyCenter: 'center',
                  paddingHorizontal: 5,
                  width: 155,
                  paddingVertical: 15,
                  borderWidth: 1,
                  borderColor: Color.BLACK,
                  backgroundColor: Color.LIGHT_GREY,
                  borderRadius: 15,
                }}>
                <View>
                  <FontAwesome5 name="warehouse" color={Color.GREY} size={25} />
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontSize: 20, color: Color.BLACK }}>Resturant</Text>
                </View>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    backgroundColor: isHouse ? Color.WHITE : Color.GREEN,
                    borderWidth: 1,
                    borderColor: Color.BLACK,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ marginHorizontal: 20 }}>
            <Input
              onChangeText={setLocationName}
              value={locationName}
              placeholder="Location Name"
              containerStyle={{}}
            />

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SelectMap")
              }}
            >

              <View
                style={{
                  display: 'flex',
                  alignSelf: 'center',
                  width: '100%',
                  elevation: 1,
                  backgroundColor: Color.WHITE,
                  paddingHorizontal: 15,
                  paddingVertical: IsIOS() ? scale * 5 : scale * 3,
                  marginVertical: 10,
                  borderWidth: 1,
                  borderColor: '#F2F2F2',
                }}>
                <Text
                  style={{
                    color: route?.params?.address ? Color.BLACK : Color.GREY,
                    backgroundColor: Color.WHITE,
                    paddingVertical: 12,
                    paddingLeft: 5
                  }}>
                  {route?.params?.address ? route?.params?.address : "Address"}
                </Text>
              </View>
              {/* <Input
              onChangeText={setAddress}
              value={address}
              placeholder="Address"
              containerStyle={{}}
            /> */}
            </TouchableOpacity>

            <Input
              onChangeText={setCity}
              value={city}
              placeholder="City / Amphoe"
            />
            <Input
              onChangeText={setStateProvince}
              value={stateProvince}
              placeholder="State / Province"
            />

            {/* <View
              style={{
                display: 'flex',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                // borderRadius: 100,
                width: '100%',
                elevation: 1,
                backgroundColor: Color.WHITE,
                paddingHorizontal: 15,
                paddingVertical: IsIOS() ? scale * 5 : scale * 3,
                marginVertical: 10,
                borderWidth: 1,
                borderColor: '#F2F2F2',
              }}>
              <Text
                style={{
                  color: Color.GREY,
                  backgroundColor: Color.WHITE,
                  paddingVertical: 12,
                }}>
                Experience
              </Text>
              <View
                style={{
                  elevation: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  borderWidth: 1,
                  paddingHorizontal: 8,
                  paddingVertical: 8,
                  borderColor: '#F2F2F2',
                }}>
                <Entypo
                  name="minus"
                  color={Color.GREY}
                  size={25}
                  onPress={() => {
                    experience >= 1 && setExperience(experience - 1);
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.BLACK,
                    marginHorizontal: 20,
                  }}>
                  {experience}
                </Text>
                <Entypo
                  name="plus"
                  color={Color.GREY}
                  size={25}
                  onPress={() => {
                    setExperience(experience + 1);
                  }}
                />
              </View>
            </View> */}

            <Input
              onChangeText={setZipCode}
              value={zipCode}
              placeholder="Zip Code"
              containerStyle={{ marginBottom: 20 }}
            />

            <PickImage
              heading={`Add Your ${place} Image`}
              onPress={() => {
                imagePicker();
              }}
              photo={placeImage}
            />
            <Button
              containerStyle={{
                backgroundColor: Color.GREEN,
                marginVertical: 30,
              }}
              onPress={() => {
                addHouse()
              }}
              title="FINISH"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OwnHouse;
