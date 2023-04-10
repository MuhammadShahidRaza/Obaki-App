import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  PermissionsAndroid,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import { Color } from '../../utils/color';
import BackButton from '../../components/backButton';
import { Input } from '../../components/inputs';
import { IsIOS, isEmpty, isEmptyArray, selectPictureOptions } from '../../utils/helper';
import PhoneInput from 'react-native-phone-number-input';
import PickImage from '../../components/pickImage';
import Checkbox from '../../components/checkbox';
import { Button } from '../../components/buttons';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import CountryPicker from 'react-native-country-picker-modal';
import { showToast } from '../../utils/Toast';
import { GetItemFromStorage } from '../../utils/storage';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import { BASE_URL } from '../../constants/keys';
import storage from '@react-native-firebase/storage';
const { width, height, scale } = Dimensions.get('screen');

const RegisterChef = ({ navigation,route }) => {
  const [name, setName] = useState('');

  const [country, setCountry] = useState(null);

  const onSelect = country => {
    setCountry(country);
  };

  const [stateProvince, setStateProvince] = useState('');
  const [experience, setExperience] = useState(0);
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [foodCountry, setFoodCountry] = useState([]);
  const [foodType, setFoodType] = useState([]);
  const [dietaryType, setDietaryType] = useState([]);
  const [description, setDescription] = useState('');

  const [haveCertificate, setHaveCertificate] = useState('');
  const [ownHouse, setOwnHouse] = useState('');

  const [profileImage, setProfileImage] = useState('');
  const [profileImageBase64, setProfileImageBase64] = useState('');
  const [dishImage, setDishImage] = useState([]);
  const [dishImageBase64, setDishImageBase64] = useState([]);

  const foodTypeList = [
    { key: '1', value: 'Beef' },
    { key: '2', value: 'Thai Foods' },
    { key: '3', value: 'Sea Foods' },
    { key: '4', value: 'Continental' },
    { key: '5', value: 'Chinese' },
    { key: '6', value: 'Italian' },
  ];
  const foodCountryList = [
    { key: '1', value: 'India' },
    { key: '2', value: 'China' },
    { key: '3', value: 'Thailand' },
    { key: '4', value: 'MiddleEast' },
    { key: '5', value: 'Pakistan' },
  ];
  const foodDietaryList = [
    { key: '1', value: 'Gluten' },
    { key: '2', value: 'Non Diary' },
    { key: '3', value: 'Non Veg' },
    { key: '4', value: 'Veg' },
    { key: '5', value: 'Low Carb' },
    { key: '6', value: 'No Sugar' },
  ];

  // const imageOptions = {
  //   saveToPhotos: true,
  //   mediaType: 'photo',
  // };

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
            onPress:  async () => {
              // ImagePicker.openCamera({
              //   width: 300,
              //   height: 400,
              //   cropping: true,
                // includeBase64: true,
              // }).then(image => {
              //   setProfileImageBase64(image?.data)
              //   setProfileImage(image?.path);

              // });

              try {
                const image = await ImagePicker.openCamera({
                  width: 300,
                  height: 400,
                  cropping: true,
                  // includeBase64: true,
                });
                setProfileImageBase64(image.data);
                setProfileImage(image.path);
              } catch (err) {
                console.log(err);
              }
            },
          },
          {
            text: "Use Media",
            onPress: async () => {


              try {
                const image = await ImagePicker.openPicker({
                  width: 300,
                  height: 400,
                  cropping: true,
                  // includeBase64: true,
                });
                setProfileImageBase64(image.data);
                setProfileImage(image.path);
              } catch (err) {
                console.log(err);
              }


              // ImagePicker.openPicker({
              //   width: 300,
              //   height: 400,
              //   cropping: true,
                // includeBase64: true,

              // }).then(image => {
              //   setProfileImageBase64(image?.data)
              //   setProfileImage(image?.path);

              // });
            },
          },
        ],
        {
          cancelable: true,
        }
      );
    }
  }

  // function selectPictureOptions({ heading, useCamera, useLibrary }) {
  //   Alert.alert(
  //     heading,
  //     "Please select a image from camera or gallery",
  //     [
  //       {
  //         text: "Use Camera",
  //         onPress: profileImagePicker,
  //       },
  //       {
  //         text: "Use Media",
  //         onPress: useLibrary,
  //       },
  //     ],
  //     {
  //       cancelable: true,
  //     }
  //   );
  // }


  async function dishImagePicker() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        "Dish Image",
        "Please select a image from camera or gallery",
        [
          {
            text: "Use Camera",
            onPress: () => {
              ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                multiple: true,
                maxFiles: 5,
                // includeBase64: true,


              }).then(image => {

                // const list = image.map(item => imageUpload("dishImage", item.path, item.mime));
                // setDishImageBase64(list)
                setDishImage(image);

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
                multiple: true,
                maxFiles: 5,

                // includeBase64: true,
              }).then(image => {

                // const list = image.map(item => imageUpload("dishImage", item.path, item.mime));
                // setDishImageBase64(list)
                setDishImage(image);

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


   const imageUpload =  async (image, name, folder,id) => {
    // const imageData = new FormData()
    // imageData.append(name, {
    //   uri: path,
    //   name: `${name}${type}`,
    //   fileName: "image",
    //   type: type
    // })


    const blob = await (await fetch(image)).blob();
    await storage()
      .ref(`/${folder}/${id}/${name}`)
      .put(blob);
    const url = await storage()
    .ref(`/${folder}/${id}/${name}`)
      .getDownloadURL();

    // return JSON.stringify(imageData);
  }

  async function addChef() {
    if (isEmpty(name) || !country?.name || isEmpty(stateProvince) || experience === 0 || isEmptyArray(foodCountry) || isEmptyArray(foodType) || isEmptyArray(dietaryType) || isEmpty(haveCertificate) || isEmpty(ownHouse) || isEmpty(description)) {
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
        "foodCountry": foodCountry,
        "foodType": foodType,
        "dietaryType": dietaryType,
        "description": description,
        "dishImage": ["https://placeimg.com/640/480/arch"],
        // "profilePicture": "https://placeimg.com/640/480/arch",
        "certificate":  "https://placeimg.com/640/480/arch",
        "restaurantHouse": route?.params?.resturantOrHouseId ?? "",
        "profilePicture": profileImageBase64,
        //  "certificate": route?.params?.CertificateImage ?? "https://placeimg.com/640/480/arch",
        // "dishImage": dishImageBase64,
      }

      const token = await GetItemFromStorage("TOKEN")
      try {
        const response = await axios.post(`${BASE_URL}/chef`, body,
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
            message: "Chef Added Successfully"
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
                Food Country
              </Text>

              <MultipleSelectList
                setSelected={val => setFoodCountry(val)}
                placeholder="Select Food Country"
                data={foodCountryList}
                searchicon={false}
                dropdownTextStyles={{ color: Color.BLACK }}
                inputStyles={{ color: Color.GREY }}
                boxStyles={{ borderWidth: 0 }}
                labelStyles={{ height: 0 }}
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
                Food Type
              </Text>

              <MultipleSelectList
                setSelected={val => setFoodType(val)}
                placeholder="Select Food Type"
                data={foodTypeList}
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
                Dietary Type
              </Text>

              <MultipleSelectList
                setSelected={val => setDietaryType(val)}
                placeholder="Select Dietary Type"
                data={foodDietaryList}
                searchicon={false}
                // save="value"
                dropdownTextStyles={{ color: Color.BLACK }}
                inputStyles={{ color: Color.GREY }}
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
              hasMultipleImage={false}

              photo={profileImage}
              multipleImage={[]}
            />
            <PickImage
              hasMultipleImage={true}
              heading="Add your Dish Image (optional)"
              onPress={() => {
                dishImagePicker()
              }}
              photo={""}
              multipleImage={dishImage}

            />

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyCenter: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  width: 170,
                  marginRight: 5,
                  fontSize: 18,
                  color: Color.BLACK,
                  fontWeight: 'bold',
                }}>
                Do you have a certificate?
              </Text>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => {
                  setHaveCertificate('Yes');
                  navigation.navigate("AddCertificate")
                }}>
                <Checkbox title="Yes" selected={haveCertificate} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setHaveCertificate('No');
                }}>
                <Checkbox title="No" selected={haveCertificate} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyCenter: 'center',
                flexDirection: 'row',
                marginVertical: 10,
              }}>
              <Text
                style={{
                  width: 170,
                  marginRight: 5,
                  fontSize: 18,
                  color: Color.BLACK,
                  fontWeight: 'bold',
                }}>
                Do you own a resturant or house?
              </Text>
              <TouchableOpacity
                style={{ marginRight: 20 }}
                onPress={() => {
                  setOwnHouse('Yes');
                  navigation.navigate("OwnHouse")
                }}>
                <Checkbox title="Yes" selected={ownHouse} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setOwnHouse('No');
                }}>
                <Checkbox title="No" selected={ownHouse} />
              </TouchableOpacity>
            </View>

            <Button
              containerStyle={{
                backgroundColor: Color.GREEN,
                marginVertical: 30,
              }}
              onPress={() => {
                addChef()


              }}
              title="COMPLETE PROFILE"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterChef;
