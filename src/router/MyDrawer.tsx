import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarScreen from '~/screens/Calendar';
import { commonOptions } from '~/router/options';
import ChatScreen from '~/router/ChatNavigation';
import { RootStackParamList, Routes } from '~/router/navigationTypes';
import LogoutScreen from '~/screens/Logout';
import OfficeNavigator from '~/screens/Office/OfficeNavigator';

const Drawer = createDrawerNavigator<RootStackParamList>();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      id={'MainNavigator'}
      initialRouteName={Routes.Calendar}
      detachInactiveScreens={true}>
      <Drawer.Screen
        name={Routes.Calendar}
        component={CalendarScreen}
        options={{
          ...commonOptions,
          title: 'Kalendarz'
        }}
      />
      <Drawer.Screen
        name={Routes.Chat}
        component={ChatScreen}
        options={{ ...commonOptions, title: 'Wiadomości' }}
      />
      {/*<Drawer.Screen name="Pacjenci" component={SettingsScreen} options={commonOptions} />*/}
      {/*<Drawer.Screen name="Pliki" component={SettingsScreen} options={commonOptions} />*/}
      <Drawer.Screen
        name={Routes.OfficeNavigator}
        component={OfficeNavigator}
        options={{
          ...commonOptions,
          title: 'Gabinety'
        }}
      />
      {/*<Drawer.Screen name="Konto" component={SettingsScreen} options={commonOptions} />*/}
      {/*<Drawer.Screen name="Ustawienia" component={SettingsScreen} options={commonOptions} />*/}
      <Drawer.Screen
        name={Routes.Logout}
        component={LogoutScreen}
        options={{ ...commonOptions, title: 'Wyloguj się' }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
