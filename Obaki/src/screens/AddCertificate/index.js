import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  PermissionsAndroid,
  Image,
  Alert,
  // PermissionsAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utils/color';
import BackButton from '../../components/backButton';
import PickImage from '../../components/pickImage';
import {Button} from '../../components/buttons';
import { StackActions } from '@react-navigation/native';
import { showToast } from '../../utils/Toast';
import ImagePicker from 'react-native-image-crop-picker';

// import {launchCamera} from 'react-native-image-picker';

const {width, height, scale} = Dimensions.get('screen');

const AddCertificate = ({navigation}) => {
  const [certificateImage, setCertificateImage] = useState('');


  async function imagePicker() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      Alert.alert(
        "Certificate Image",
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
                setCertificateImage(image?.path);

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
                setCertificateImage(image?.path);

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
    <SafeAreaView style={{height: height, backgroundColor: Color.WHITE}}>
      <ScrollView>
        <View style={{backgroundColor: Color.WHITE}}>
          <BackButton navigation={navigation} />
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              marginVertical: 10,
              marginHorizontal: 20,
            }}>
            <Text
              style={{color: Color.BLACK, fontSize: 18, fontWeight: 'bold'}}>
              Upload any Certificate documents
            </Text>
          </View>

          <View style={{marginHorizontal: 20}}>
          <View style={{marginHorizontal: 20,marginBottom:50}}>
            <PickImage
              heading=""
              onPress={() => {
                imagePicker()
              }}
              photo={certificateImage}
            />
          </View>
            
            <Button
              containerStyle={{
                backgroundColor: Color.GREEN,
                marginVertical: 30,
              }}
              onPress={() => {
                if(certificateImage){
                navigation.dispatch(
                  StackActions.replace('RegisterChef', {
                    CertificateImage: certificateImage,
                  })
                );
              }
              else{
                showToast({
                  type: "error",
                  message: "Please Fill The Feild"
                });
              }
              }}
              title="CONTINUE"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddCertificate;
