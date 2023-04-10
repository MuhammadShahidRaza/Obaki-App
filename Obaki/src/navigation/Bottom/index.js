import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChooseOptions from '../../screens/ChooseOptions';
import Home from '../../screens/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import HomeIcon from 'react-native-vector-icons/FontAwesome5'; //mosque
import KaabaIcon from 'react-native-vector-icons/FontAwesome5'; //kaaba
import SettingIcons from 'react-native-vector-icons/Ionicons'; //md-settings-outline
import BookIcon from 'react-native-vector-icons/SimpleLineIcons'; //book-open
import { IsIOS } from '../../utils/helper';
import { Color } from '../../utils/color';
import Profile from '../../screens/Profile';
import Notifications from '../../screens/Notifications';
import Settings from '../../screens/Settings';
const Tab = createBottomTabNavigator();
{/* <Stack.Screen name="Profile" component={}  /> */}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {fontSize: 12, marginBottom:  IsIOS  ? 0 : 5,},
        tabBarActiveTintColor: Color.BLACK,
        tabBarInactiveTintColor: Color.WHITE,
        tabBarStyle: {
          backgroundColor: Color.ORANGE,
          // height: 50,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarInactiveTintColor: Color.WHITE,
          title: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <HomeIcon
                name="home"
                size={20}
                color={focused ? Color.BLACK : Color.WHITE}
              />
            );
          },
        }}
      />

      <Tab.Screen
        name="Order"
        component={Notifications}
        options={{
          title: 'Order',
          tabBarIcon: ({focused}) => {
            return (
<Feather name="shopping-bag" color={focused ? Color.BLACK : Color.WHITE} size={26} />
            );
          },
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Notifications}
        options={{
          title: 'Settings',
          tabBarIcon: ({focused}) => {
            return (
              <SettingIcons
              name="md-settings-outline"
              size={23}
              color={focused ? Color.BLACK : Color.WHITE}
            />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Notifications}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <AntDesign name="user" 
              size={23}
              color={focused ? Color.BLACK : Color.WHITE}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}