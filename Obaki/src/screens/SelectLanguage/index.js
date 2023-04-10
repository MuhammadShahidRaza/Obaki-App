import React, { useState,useEffect } from 'react';
import {
  SafeAreaView,
  Dimensions,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Button } from '../../components/buttons';
import { Color } from '../../utils/color';
import { showToast } from '../../utils/Toast';
import { GetItemFromStorage } from '../../utils/storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const { height } = Dimensions.get('screen');

function SelectLanguagePage({ navigation }) {
  const languages = ['English', 'Thai', 'Vietnamese', 'Arabic'];
  const [selectedLanguage, setSelectedLanguage] = useState('');
const [isLoading, setIsLoading] = useState(true)

useEffect( async() => {

  setTimeout(() => {
    setIsLoading(false)
  }, 3000);



 const isLoggedIn = await GetItemFromStorage("TOKEN")

if (isLoggedIn) {
  navigation.replace("Home")
}


}, [])






if (isLoading) {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="large" color={Colors.ORANGE} />
    </View>
  );
}




  async function selectedLanguageFunc() {
    if (selectedLanguage) {
      navigation.navigate('SignUp')
    }
    else {
      showToast({
        type: "error",
        message: "Please select a language."
      });
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: "white", height: height }}>
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
            <AntDesign name="user" color={Color.BLACK} size={58} />
          </View>
        </View>
        <View
          style={{
            backgroundColor: Color.WHITE,
            borderTopRightRadius: 50,
            borderTopStartRadius: 50,
            top: -50,
          }}>
          <View
            style={{
              marginVertical: 50,
              marginHorizontal: 20,
              display: 'flex',
              alignItems: 'center',
            }}>
            <Text
              style={{ fontWeight: 'bold', fontSize: 25, color: Color.BLACK }}>
              Select Your App Language
            </Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            {languages.map((item, index) => {
              const isSelected = selectedLanguage === item;
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSelectedLanguage(item);
                  }}>
                  <View
                    style={{
                      marginBottom: 18,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: isSelected ? Color.ORANGE : Color.GREY,
                        borderWidth: 1.5,
                        marginRight: 12,
                      }}>
                      <View
                        style={{
                          backgroundColor: isSelected
                            ? Color.ORANGE
                            : Color.WHITE,
                          width: 10,
                          height: 10,
                          borderRadius: 10,
                        }}
                      />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: Color.BLACK }}>
                      {item}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button
            onPress={() => { selectedLanguageFunc() }}
            title="NEXT"
            containerStyle={{ marginHorizontal: 20, marginVertical: 40 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default SelectLanguagePage;
