import 'react-native-gesture-handler';
import React from 'react';

import AppNavigation from './src/navigation/AppNavigation';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

function App() {
  return (
    <>
      <AppNavigation />
      <Toast />
    </>
  );
}

export default App;
