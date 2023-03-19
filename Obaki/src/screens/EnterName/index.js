import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {Button} from '../../components/buttons';
import {Input} from '../../components/inputs';
import {Color} from '../../utils/color';
import CountryPicker from 'react-native-country-picker-modal';
const {height} = Dimensions.get('screen');

function EnterName({navigation}) {
  const [name, setName] = useState('');
  const [country, setCountry] = useState(null);

  const onSelect = country => {
    setCountry(country);
  };

  return (
    <SafeAreaView style={{backgroundColor: Color.WHITE, height: height}}>
      <ScrollView>
        <View style={{marginHorizontal: 20}}>
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
          <View style={{height: 350}}>
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

              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </View>

          <View>
            <Button
              onPress={() => { 
name && country?.name &&
                navigation.navigate('Home');
              }}
              title="CONTINUE"
              containerStyle={{marginTop: 0}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EnterName;
