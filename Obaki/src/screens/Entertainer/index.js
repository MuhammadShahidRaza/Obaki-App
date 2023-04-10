import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  Alert,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { Color } from '../../utils/color';
import BackButton from '../../components/backButton';
import { Input } from '../../components/inputs';
import { IsIOS, isEmpty, isEmptyArray } from '../../utils/helper';
import PhoneInput from 'react-native-phone-number-input';
import PickImage from '../../components/pickImage';
import Checkbox from '../../components/checkbox';
import { Button } from '../../components/buttons';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import CountryPicker from 'react-native-country-picker-modal';
import { showToast } from '../../utils/Toast';
import { BASE_URL } from '../../constants/keys';
import axios from 'axios';
import { GetItemFromStorage } from '../../utils/storage';
// import {launchCamera} from 'react-native-image-picker';

const { width, height, scale } = Dimensions.get('screen');

const Entertainer = ({ navigation }) => {
  const [name, setName] = useState('');

  const [country, setCountry] = useState(null);

  const onSelect = country => {
    setCountry(country);
  };

  const [stateProvince, setStateProvince] = useState('');
  const [experience, setExperience] = useState(0);
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [genre, setGenre] = useState([]);
  const [entertainerType, setEntertainerType] = useState([]);
  const [description, setDescription] = useState('');

  const [haveCertificate, setHaveCertificate] = useState('');
  const [ownHouse, setOwnHouse] = useState('');

  const [profileImage, setProfileImage] = useState('');
  const [dishImage, setDishImage] = useState('');

  const entertainerTypeList = [
    { key: '1', value: 'Musician' },
    { key: '2', value: 'Vocalist' },
    { key: '3', value: 'Magician' },
    { key: '4', value: 'Comedian' },
    { key: '5', value: 'Band' },
  ];
  const genreList = [
    { key: '1', value: 'Rock' },
    { key: '2', value: 'Hip Hop' },
    { key: '3', value: 'Rap' },
    { key: '4', value: 'Jazz' },
    { key: '5', value: 'Blues' },
    { key: '6', value: 'Acoustic' },
  ];

  const imageOptions = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  async function addEntertainer() {
    if (isEmpty(name) || !country?.name || isEmpty(stateProvince) || experience === 0 || isEmptyArray(entertainerType) || isEmptyArray(genre) || isEmpty(description)) {
      showToast({
        type: "error",
        message: "Please Fill All The Feilds."
      });
      return;
    }

    else {
      const body =

      {
        "name": name,
        "country": country?.name,
        "state": stateProvince,
        "experience": `${experience}`,
        "genre": genre,
        "entertainerType": entertainerType,
        "description": description,
        // "uploadImage": "{{$randomImageDataUri}}"
        "uploadImage": "https://placeimg.com/640/480/arch"


      }

      const token = await GetItemFromStorage("TOKEN")
      try {
        const response = await axios.post(`${BASE_URL}/entertainer`, body,
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
          showToast({
            type: "success",
            message: "Entertainer Added Successfully"
          });
          navigation.navigate("Dashboard")

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
  async function profileImagePicker() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        "Profile Picture",
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
                // setProfileImageBase64(image?.data)
                setProfileImage(image?.path);

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
                // setProfileImageBase64(image?.data)
                setProfileImage(image?.path);

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


  return (
    <SafeAreaView

    // style={{height:height}}
    >
      <ScrollView>
        <View style={{ backgroundColor: Color.WHITE }}>
          <BackButton navigation={navigation} />
          <View
            style={{ display: 'flex', alignItems: 'center', marginVertical: 10 }}>
            <Text
              style={{ fontSize: 20, color: Color.BLACK, fontWeight: 'bold' }}>
              Enter Your Information
            </Text>
          </View>

          <View style={{ marginHorizontal: 20 }}>
            <Input
              onChangeText={setName}
              value={name}
              placeholder="Name"
              containerStyle={{}}
            />
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
            <Input
              onChangeText={setStateProvince}
              value={stateProvince}
              placeholder="State / Province"
            />

            <View
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
                paddingVertical: IsIOS() ? scale * 5 : scale * 2,
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
            </View>


            <View
              style={{
                display: 'flex',
                width: '100%',
                elevation: 1,
                backgroundColor: Color.WHITE,
                paddingHorizontal: 15,
                paddingVertical: IsIOS() ? scale * 5 : scale * 2,
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
                Type of Entertainer
              </Text>

              <MultipleSelectList
                setSelected={val => setEntertainerType(val)}
                placeholder="Select Entertainer Type"
                data={entertainerTypeList}
                searchicon={false}
                dropdownTextStyles={{ color: Color.BLACK }}
                inputStyles={{ color: Color.GREY }}
                boxStyles={{ borderWidth: 0 }}
                labelStyles={{ height: 0 }}
              // save="value"
              />
            </View>

            <View
              style={{
                display: 'flex',
                width: '100%',
                elevation: 1,
                backgroundColor: Color.WHITE,
                paddingHorizontal: 15,
                paddingVertical: IsIOS() ? scale * 5 : scale * 2,
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
                Genre
              </Text>

              <MultipleSelectList
                setSelected={val => setGenre(val)}
                placeholder="Select Genre"
                data={genreList}
                searchicon={false}
                dropdownTextStyles={{ color: Color.BLACK }}
                inputStyles={{ color: Color.GREY }}
                // save="value"
                boxStyles={{ borderWidth: 0 }}
                labelStyles={{ height: 0 }}
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text
                style={{ fontSize: 16, color: Color.BLACK, fontWeight: 'bold' }}>
                Add Description about yourself
              </Text>
              <Input
                onChangeText={setDescription}
                value={description}
                placeholder="Enter Description"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <PickImage
              heading="Add your Profile Image"
              onPress={() => {
                profileImagePicker();
              }}
              photo={profileImage}
            />



            <Button
              containerStyle={{
                backgroundColor: Color.GREEN,
                marginVertical: 30,
              }}
              onPress={() => {
                addEntertainer()

              }}
              title="COMPLETE PROFILE"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Entertainer;
