import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  TextInput,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {Color} from '../../utils/color';
import BackButton from '../../components/backButton';
import {Input} from '../../components/inputs';
import {IsIOS} from '../../utils/helper';
import PhoneInput from 'react-native-phone-number-input';
import PickImage from '../../components/pickImage';
import Checkbox from '../../components/checkbox';
import {Button} from '../../components/buttons';
import {MultipleSelectList} from 'react-native-dropdown-select-list';
import CountryPicker from 'react-native-country-picker-modal';

const {width, height, scale} = Dimensions.get('screen');

const RegisterChef = ({navigation}) => {
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
  const [dishImage, setDishImage] = useState('');

  const foodTypeList = [
    {key: '1', value: 'Beef'},
    {key: '2', value: 'Thai Foods'},
    {key: '3', value: 'Sea Foods'},
    {key: '4', value: 'Continental'},
    {key: '5', value: 'Chinese'},
    {key: '6', value: 'Italian'},
  ];
  const foodCountryList = [
    {key: '1', value: 'Beef'},
    {key: '2', value: 'Thai Foods'},
    {key: '3', value: 'Sea Foods'},
    {key: '4', value: 'Continental'},
    {key: '5', value: 'Chinese'},
    {key: '6', value: 'Italian'},
  ];
  const foodDietaryList = [
    {key: '1', value: 'Gluten'},
    {key: '2', value: 'Non Diary'},
    {key: '3', value: 'Non Veg'},
    {key: '4', value: 'Veg'},
    {key: '5', value: 'Low Carb'},
    {key: '6', value: 'No Sugar'},
  ];

  return (
    <SafeAreaView

    // style={{height:height}}
    >
      <ScrollView>
        <View style={{backgroundColor: Color.WHITE}}>
          <BackButton navigation={navigation} />
          <View
            style={{display: 'flex', alignItems: 'center', marginVertical: 10}}>
            <Text
              style={{fontSize: 20, color: Color.BLACK, fontWeight: 'bold'}}>
              Enter Your Information
            </Text>
          </View>

          <View style={{marginHorizontal: 20}}>
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
              onChangeText={stateProvince}
              value={setStateProvince}
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
                boxStyles={{borderWidth: 0}}
                labelStyles={{height: 0}}
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
                boxStyles={{borderWidth: 0}}
                labelStyles={{height: 0}}
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
                boxStyles={{borderWidth: 0}}
                labelStyles={{height: 0}}
              />
            </View>

            <View style={{marginVertical: 10}}>
              <Text
                style={{fontSize: 16, color: Color.BLACK, fontWeight: 'bold'}}>
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

            <PickImage heading="Add your Profile Image" onPress={() => {}} />
            <PickImage
              heading="Add your Dish Image (optional)"
              onPress={() => {}}
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
                  fontWeight: 'bold',
                }}>
                Do you have a certificate?
              </Text>
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  setHaveCertificate('Yes');
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
                  fontWeight: 'bold',
                }}>
                Do you own a resturant or house?
              </Text>
              <TouchableOpacity
                style={{marginRight: 20}}
                onPress={() => {
                  setHaveCertificate('Yes');
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

            <Button
              containerStyle={{
                backgroundColor: Color.GREEN,
                marginVertical: 30,
              }}
              onPress={() => {}}
              title="COMPLETE PROFILE"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterChef;
