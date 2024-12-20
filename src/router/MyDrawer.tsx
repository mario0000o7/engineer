import { createDrawerNavigator } from '@react-navigation/drawer';
import CalendarScreen from '~/screens/Calendar';
import { commonOptions } from '~/router/options';
import ChatScreen from '~/router/ChatNavigation';
import { RootStackParamList, Routes } from '~/router/navigationTypes';
import LogoutScreen from '~/screens/Logout';
import OfficeNavigator from '~/screens/Office/OfficeNavigator';
import Settings from '~/screens/Settings';
import { useAppSelector } from '~/redux/hooks';
import DaysOffList from '~/screens/DaysOffList';

const Drawer = createDrawerNavigator<RootStackParamList>();

const MyDrawer = () => {
  const role = useAppSelector((state) => state.session.role);
  return (
    <Drawer.Navigator
      id={'MainNavigator'}
      initialRouteName={Routes.Calendar}
      screenOptions={{
        drawerType: 'front',
        drawerStyle: {
          backgroundColor: 'red',
          width: 50
        }
      }}
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
      {role === 1 && (
        <Drawer.Screen
          name={Routes.DaysOffList}
          component={DaysOffList}
          options={{ ...commonOptions, title: 'Urlopy' }}
        />
      )}
      <Drawer.Screen
        name={Routes.Settings}
        component={Settings}
        options={{ ...commonOptions, title: 'Ustawienia' }}
      />
      <Drawer.Screen
        name={Routes.Logout}
        component={LogoutScreen}
        options={{ ...commonOptions, title: 'Wyloguj się' }}
      />
    </Drawer.Navigator>
  );
};

export default MyDrawer;
