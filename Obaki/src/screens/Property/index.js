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
import React, { useState } from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import { showToast } from '../../utils/Toast';
import { BASE_URL } from '../../constants/keys';
import axios from 'axios';
import { GetItemFromStorage } from '../../utils/storage';
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
// import {launchCamera} from 'react-native-image-picker';

const { width, height, scale } = Dimensions.get('screen');

const Property = ({ navigation, route }) => {
  const [name, setName] = useState('');

  const [country, setCountry] = useState(null);

  const onSelect = country => {
    setCountry(country);
  };

  const [stateProvince, setStateProvince] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [price, setPrice] = useState('$ ');
  const [people, setpeople] = useState(0);
  const [openCountryModal, setOpenCountryModal] = useState(false);
  const [stayType, setStayType] = useState([]);
  const [roomType, setRoomType] = useState([]);
  const [scenaryType, setScenaryType] = useState([]);
  const [amenties, setAmenties] = useState([]);
  const [description, setDescription] = useState('');


  const [propertyImage, setpropertyImage] = useState([]);
  const [propertyImageBase64, setpropertyImagesBase64] = useState([]);

  const staysList = [
    { key: '1', value: 'Condo' },
    { key: '2', value: 'House' },
    { key: '3', value: 'Resort' },
    { key: '4', value: 'Villas' },
    { key: '5', value: 'Hotel' },
  ];
  const roomTypesList = [
    { key: '1', value: 'King' },
    { key: '2', value: 'Suites' },
    { key: '3', value: 'Twins' },
    { key: '4', value: 'Double' },
    { key: '5', value: 'Single' },
  ];
  const amenitiesList = [
    { key: '1', value: 'Wifi' },
    { key: '2', value: 'Pools' },
    { key: '3', value: 'Kitchen' },
    { key: '4', value: 'Balcony' },
    { key: '5', value: 'Pet Friendly' },
  ];
  const scenaryList = [
    { key: '1', value: 'Beach' },
    { key: '2', value: 'Mountain' },
    { key: '3', value: 'City' },
    { key: '4', value: 'Forest' },
    { key: '5', value: 'Desert' },
  ];

  async function addProperty() {
    if (isEmpty(price) || isEmpty(name) || isEmpty(zipCode) || !country?.name || isEmpty(route?.params?.address) || isEmpty(stateProvince) || people === 0 || isEmptyArray(stayType) || isEmptyArray(roomType) || isEmptyArray(amenties) || isEmptyArray(scenaryType) || isEmpty(description)) {
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
        "zipcode": zipCode,
        "typeOfStay": stayType,
        "typeOfRoom": roomType,
        "amenities": amenties,
        "sceneryType": scenaryType,
        "totalPerson": `${people}`,
        "PricePerNight": `${price}`,
        "bookingDate":`${ new Date().toLocaleDateString()}`,
        "description": description,
        // "propertyImages": ["{{$randomImageDataUri}}","{{$randomImageDataUri}}"]
        "propertyImages": ["https://placeimg.com/640/480/arch"]

      }

      const token = await GetItemFromStorage("TOKEN")
      try {
        const response = await axios.post(`${BASE_URL}/property`, body,
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
            message: "Property Added Successfully"
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
  async function propertyImagePicker() {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert(
          "Property Image",
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
  
                  const list = image.map(item => imageUpload("propertyImages", item.path, item.mime));
                  setpropertyImagesBase64(list)
                  setpropertyImage(image);
  
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
  
                  const list = image.map(item => imageUpload("propertyImages", item.path, item.mime));
                  setpropertyImagesBase64(list)
                  setpropertyImage(image);
  
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
  
  
    const imageUpload = (name, path, type) => {
      const imageData = new FormData()
      imageData.append(name, {
        uri: path,
        name: `${name}${type}`,
        fileName: "image",
        type: type
      })
  
  
      return JSON.stringify(imageData);
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

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SelectMap", {
                  fromProperty: true
                })
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
                    paddingleft: 5
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

            <Input
              onChangeText={setZipCode}
              value={zipCode}
              placeholder="Zipcode"
            />



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
                Type of Stay
              </Text>

              <MultipleSelectList
                setSelected={val => setStayType(val)}
                placeholder="Select Type of Stay"
                data={staysList}
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
                Room Type
              </Text>

              <MultipleSelectList
                setSelected={val => setRoomType(val)}
                placeholder="Select Room Type"
                data={roomTypesList}
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
                Amenities
              </Text>

              <MultipleSelectList
                setSelected={val => setAmenties(val)}
                placeholder="Select Amenities"
                data={amenitiesList}
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
                Scenary Type
              </Text>

              <MultipleSelectList
                setSelected={val => setScenaryType(val)}
                placeholder="Select Scenary Type"
                data={scenaryList}
                searchicon={false}
                dropdownTextStyles={{ color: Color.BLACK }}
                inputStyles={{ color: Color.GREY }}
                // save="value"
                boxStyles={{ borderWidth: 0 }}
                labelStyles={{ height: 0 }}
              />
            </View>


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
                How many people can stay?
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
                    people >= 1 && setpeople(people - 1);
                  }}
                />
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: Color.BLACK,
                    marginHorizontal: 20,
                  }}>
                  {people}
                </Text>
                <Entypo
                  name="plus"
                  color={Color.GREY}
                  size={25}
                  onPress={() => {
                    setpeople(people + 1);
                  }}
                />
              </View>
            </View>


            <View>
              <Text>Base Price</Text>
              <Input
                onChangeText={setPrice}
                value={price}
                keyboardType="number-pad"
                placeholder="Price"
              />
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text
                style={{ fontSize: 16, color: Color.BLACK, fontWeight: 'bold' }}>
                Add Description about your Property
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



            {/* <PickImage
              hasMultipleImage={true}
              heading="Add your Property Pictures"
              onPress={() => {
                propertyImagePicker()
              }}
              photo={""}
              multipleImage={propertyImage}

            /> */}
            <Button
              containerStyle={{
                backgroundColor: Color.GREEN,
                marginVertical: 30,
              }}
              onPress={() => {

                addProperty()
              }}
              title="COMPLETE LISTING"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Property;
