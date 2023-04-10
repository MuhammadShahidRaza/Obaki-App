import React, {useRef, useState} from 'react';
import {TextInput} from 'react-native';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button} from '../../components/buttons';
import {Input} from '../../components/inputs';
import {Color} from '../../utils/color';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { BASE_URL } from '../../constants/keys';
import axios from 'axios';
import { isEmpty } from '../../utils/helper';
import { showToast } from '../../utils/Toast';


const {height} = Dimensions.get('screen');

const CELL_COUNT = 6;


function OptVerification({navigation,route}) {
 
  const { phone , _password } = route.params;

  const [formattedValue, setFormattedValue] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });


  async function verifyUser() {

if(isEmpty(value) || value.length <=5){
  showToast({
    type: "error",
    message: "Please Fill the Feilds"
  });
  return
}
    const body = {
        "phone" : phone,
        "otp" : value
    }
    try {
      const response = await axios.post(`${BASE_URL}/verifyOtp`, body);
      const result = response.data;

      if (result) {
        navigation.navigate('EnterName',{
          email:"",
          password:_password,
          phone:formattedValue
        }) 
        showToast({
          type: "success",
          message: result.message
        });
      }
    } catch (errors) {
      const Error = errors?.response?.data?.message[0]?.message ?? errors?.response?.data?.message
          showToast({
            type: "error",
            message: Error
          });
    }
  };


  return (
    <SafeAreaView style={{backgroundColor: 'white', height: height}}>
      <ScrollView>
        <View
          style={{
            backgroundColor: Color.ORANGE,
            height: 220,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
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
            <AntDesign name="lock" color={Color.BLACK} size={58} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.WHITE,
            borderTopRightRadius: 50,
            borderTopStartRadius: 50,
            top: -50,
          }}>
          <View style={{marginHorizontal: 20}}>
            <View
              style={{
                marginTop: 50,
                marginBottom: 30,
              }}>
              <Text
                style={{fontWeight: 'bold', fontSize: 25, color: Color.BLACK}}>
                Easy Peasy
              </Text>
              <Text style={{fontSize: 17, color: Color.BLACK}}>
                Please enter the 6 Digit code we sent you via mobile to continue
              </Text>
            </View>

            <View style={{marginVertical:30}}>

<CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        // rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

            </View>
            <View
              style={{
                display: 'flex',
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Text
                  style={{color: Color.ORANGE, fontSize: 18, fontWeight: 500}}>
                  Resend Code
                </Text>
              </TouchableOpacity>
            </View>

            <Button
             onPress={()=>{
              verifyUser()
            }}
              title="LET'S GO!"
              containerStyle={{marginTop: 20}}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  // codeFieldRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    color:Color.BLACK,
    borderBottomWidth: 2,
    borderColor: Color.BLACK,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});

export default OptVerification;
