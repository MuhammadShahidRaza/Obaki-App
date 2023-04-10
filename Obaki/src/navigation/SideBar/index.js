import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { TabRouter } from '@react-navigation/native';
import ChooseOptions from '../../screens/ChooseOptions';
import SideBarScreen from '../../screens/SideBarScreen';
import Dashboard from '../../screens/Dashboard';
import TabNavigator from '../Bottom';

const Drawer = createDrawerNavigator();

function Sidebar() {
  return (
    <Drawer.Navigator  drawerContent={props =>  <SideBarScreen {...props} />}>
      <Drawer.Screen name="Home" component={TabNavigator}  options={{headerShown:false}} />
      <Drawer.Screen name="Dashboard" component={Dashboard}  options={{headerShown:false}} />
      <Drawer.Screen name="ChooseOptions" component={ChooseOptions}  options={{headerShown:false}} />
    </Drawer.Navigator>
  );
}

export default Sidebar;