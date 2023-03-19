import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React from 'react';
import {Color} from '../../utils/color';
import Header from '../../components/header';
import OptionBox from '../../components/optionBox';

const {width} = Dimensions.get('window');

const ChooseOptions = ({navigation}) => {
  return (
    <SafeAreaView>
        <ScrollView >
      <Header />
      <View>
        <View style={{display: 'flex', alignItems: 'center'}}>
          <Text style={{fontSize: 20, fontWeight: '900', color: Color.BLACK}}>
            What would you like to do ?
          </Text>
        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom:30
          }}>
          <OptionBox
            image={require('../../assets/images/popular.jpg')}
            title="Become A Cook"
            onPress={()=>{
                navigation.navigate("RegisterChef")
            }}
          />
          <OptionBox
            image={require('../../assets/images/entertainer.png')}
            title="Entertainer"
            onPress={()=>{

            }}
          />
          <OptionBox
            image={require('../../assets/images/property.jpg')}
            title="List Your Property"
            onPress={()=>{

            }}
          />
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChooseOptions;
