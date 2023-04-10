import {
  View,
  Text,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React ,{useState,useEffect}from 'react';
import { Color } from '../../utils/color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { FlatlistComponent } from '../../components/flatlists';
import { useRoute } from '@react-navigation/native';
const { height,scale } = Dimensions.get('screen');

const SideBarScreen = ({ navigation }) => {
const [isOnHome, setIsOnHome] = useState("Home")
  // const route = useRoute();
  
// useEffect(() => {

//   setIsOnHome(route.name)
// }, [route.name])


  // const isOnHome = route.name === "Home" ? true : false 


console.log("isOnHome" ,isOnHome);

  const listScreen = [
    {
      name: 'Profile',
      icon: <AntDesign name="user" color={Color.ORANGE} size={25} />,
      screen: 'Notifications',
    },
    {
      name: 'Work For Obaki',
      icon: <AntDesign name="shrink" color={Color.ORANGE} size={25} />,
      screen: 'ChooseOptions',
    },
    {
      name: `Switch Back to ${isOnHome === "Home" ? "Work" : "Customer"}`,
      icon: (
        <MaterialCommunityIcons
          name="account-switch" color={Color.ORANGE} size={25} />
      ),
      screen: `${isOnHome === "Home" ? "Dashboard" : "Home"}`,
    },
    {
      name: 'Orders',
      icon: <Feather name="shopping-bag" color={Color.ORANGE} size={25} />,
      screen: 'Notifications',
    },
    {
      name: 'Notifications',
      icon: <AntDesign name="bells" color={Color.ORANGE} size={25} />,
      screen: 'Notifications',
    },
    {
      name: 'Payment',
      icon: <AntDesign name="wallet" color={Color.ORANGE} size={25} />,
      screen: 'Notifications',
    },
    {
      name: 'Favourities',
      icon: <AntDesign name="hearto" color={Color.ORANGE} size={25} />,
      screen: 'Notifications',
    },

    {
      name: 'Addresses',
      icon: <Ionicons name="location-outline" color={Color.ORANGE} size={25} />,
      screen: 'Notifications',
    },
    {
      name: 'Safety Center',
      icon: (
        <MaterialCommunityIcons
          name="shield-check-outline"
          color={Color.ORANGE}
          size={25}
        />
      ),
      screen: 'Notifications',
    },
    {
      name: 'Settings',
      icon: <AntDesign name="setting" color={Color.ORANGE} size={25} />,
      screen: 'Notifications',
    },
    {
      name: 'Logout',
      icon: <AntDesign name="logout" color={Color.ORANGE} size={25} />,
      screen: 'SignUp',
    },
  ];

  return (
    <SafeAreaView>
      <View style={{ backgroundColor: Color.ORANGE, height: 120 }}>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 20,
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View style={{ marginRight: 20 }}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={{ width: 60, height: 60, borderRadius: 60 }}
            />
          </View>
          <View>
            <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Samwik</Text>

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <Text style={{ fontSize: 22, color: Color.WHITE, marginRight: 20 }}>
                Edit
              </Text>
              <Entypo name="share" color={Color.WHITE} size={25} />
            </View>
          </View>
        </View>
        {/* <ScrollView> */}
        <View
          style={{ height: height, marginVertical: 5, marginHorizontal: 15 }}>
          <FlatlistComponent
            data={listScreen}

            keyExtractor={item => item.icon}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
if (item.screen === "Dashboard") {
  setIsOnHome("Dashboard")
  item.screen && navigation.navigate(item.screen);
  return
}
if (item.screen === "Home") {
  setIsOnHome("Home")
  item.screen && navigation.navigate(item.screen);
  return
}


                    item.screen && navigation.navigate(item.screen);
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexDirection: 'row',

                      marginTop: 25,
                    }}>
                    <View style={{ marginRight: 15 }}>{item.icon}</View>
                    <View style={{width: scale * 100,}}>
                      <Text
                        style={{
                          color: Color.BLACK,
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}>
                        {item.name}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        {/* </ScrollView> */}
      </View>
    </SafeAreaView>
  );
};

export default SideBarScreen;
