import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignUp from './src/screens/SignUp';
import SelectLanguagePage from './src/screens/SelectLanguage';
import OptVerification from './src/screens/Opt';
import SignUpWithEmail from './src/screens/SignUpWithEmail';
import SignIn from './src/screens/SignIn';
import EnterName from './src/screens/EnterName';
import Home from './src/screens/Home';
import ChooseOptions from './src/screens/ChooseOptions';
import RegisterChef from './src/screens/RegisterChef';
const Stack = createNativeStackNavigator();

function App() {
  const headerOption = {headerShown: false, headerBackVisible: false};

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={headerOption}
        initialRouteName="RegisterChef">
        <Stack.Screen
          name="SelectLanguagePage"
          component={SelectLanguagePage}
          options={headerOption}
        />
        <Stack.Screen name="SignIn" component={SignIn} options={headerOption} />
        <Stack.Screen name="ChooseOptions" component={ChooseOptions} options={headerOption} />
        <Stack.Screen name="RegisterChef" component={RegisterChef} options={headerOption} />
        <Stack.Screen name="Home" component={Home} options={headerOption} />
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

export default App;
