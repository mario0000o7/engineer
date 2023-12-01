import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarScreen from '~/screens/Calendar';
import { commonOptions } from '~/router/options';
import ChatScreen from '~/router/ChatNavigation';
import { RootStackParamList, Routes } from '~/router/navigationTypes';
import LogoutScreen from '~/screens/Logout';

const Drawer = createDrawerNavigator<RootStackParamList>();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      id={'MainNavigator'}
      initialRouteName={Routes.Calendar}
      detachInactiveScreens={true}>
      <Drawer.Screen name={Routes.Calendar} component={CalendarScreen} options={commonOptions} />
      <Drawer.Screen name={Routes.Chat} component={ChatScreen} options={commonOptions} />
      {/*<Drawer.Screen name="Pliki" component={SettingsScreen} options={commonOptions} />*/}
      {/*<Drawer.Screen name="Gabinety" component={SettingsScreen} options={commonOptions} />*/}
      {/*<Drawer.Screen name="Konto" component={SettingsScreen} options={commonOptions} />*/}
      {/*<Drawer.Screen name="Ustawienia" component={SettingsScreen} options={commonOptions} />*/}
      <Drawer.Screen name={Routes.Logout} component={LogoutScreen} options={commonOptions} />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
