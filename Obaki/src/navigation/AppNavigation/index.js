import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from '../../screens/SignUp';
import SelectLanguagePage from '../../screens/SelectLanguage';
import OptVerification from '../../screens/Opt';
import SignUpWithEmail from '../../screens/SignUpWithEmail';
import SignIn from '../../screens/SignIn';
import AddCertificate from '../../screens/AddCertificate';
import SelectMap from '../../screens/SelectMap';
import EnterName from '../../screens/EnterName';
import Home from '../../screens/Home';
import ChooseOptions from '../../screens/ChooseOptions';
import RegisterChef from '../../screens/RegisterChef';
import SideBarScreen from '../../screens/SideBarScreen';
import OwnHouse from '../../screens/OwnHouse';
import Sidebar from '../SideBar';
import TabNavigator from '../Bottom';
import Property from '../../screens/Property';
import Entertainer from '../../screens/Entertainer';
import Dashboard from '../../screens/Dashboard';
import Notifications from '../../screens/Notifications';
import Order from '../../screens/Order';
import Profile from '../../screens/Profile';
import Settings from '../../screens/Settings';
const Stack = createNativeStackNavigator();

function AppNavigation() {
  const headerOption = {headerShown: false, headerBackVisible: false};

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={headerOption}
        initialRouteName="SelectLanguagePage">
        <Stack.Screen
          name="SelectLanguagePage"
          component={SelectLanguagePage}
          options={headerOption}
        />
        <Stack.Screen name="SignIn" component={SignIn} options={headerOption} />
        <Stack.Screen name="ChooseOptions" component={ChooseOptions} options={headerOption} />
        <Stack.Screen name="RegisterChef" component={RegisterChef}  />
        <Stack.Screen name="Home" component={Sidebar}  />
        <Stack.Screen name="OwnHouse" component={OwnHouse} options={headerOption} />
        <Stack.Screen name="Notifications" component={Notifications} options={headerOption} />
        <Stack.Screen name="Order" component={Order} options={headerOption} />
        <Stack.Screen name="SelectMap" component={SelectMap} options={headerOption} />
        <Stack.Screen name="SideBarScreen" component={SideBarScreen} options={headerOption} />
        <Stack.Screen name="Settings" component={Settings} options={headerOption} />
        <Stack.Screen name="Profile" component={Profile} options={headerOption} />
        <Stack.Screen name="AddCertificate" component={AddCertificate} options={headerOption} />
        <Stack.Screen name="Property" component={Property} options={headerOption} />
        <Stack.Screen name="Entertainer" component={Entertainer} options={headerOption} />
        <Stack.Screen name="SignUp" component={SignUp} options={headerOption} />
        <Stack.Screen name="EnterName" component={EnterName} options={headerOption} />
        <Stack.Screen
          name="SignUpWithEmail"
          component={SignUpWithEmail}
          options={headerOption}
        />
        <Stack.Screen
          name="OptVerification"
          component={OptVerification}
          options={headerOption}
        />
      </Stack.Navigator>
   
    </NavigationContainer>
  );
}

export default AppNavigation;
