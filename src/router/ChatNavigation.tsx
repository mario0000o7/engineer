import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import Icon from 'react-native-paper/src/components/Icon';
import styles from '~/router/styles';
import { COLOR } from '~/styles/constants';
import ContactListNavigatorRecent from '~/screens/Chat/ContactListNavigatorRecent';
import ContactListNavigatorStable from '~/screens/Chat/ContactListNavigatorStable';

const Tab = createBottomTabNavigator<RootStackParamList>();

export interface ParentNavigationProps {
  parentNavigation: NavigationProps<Routes.Chat>['navigation'];
}

const ChatScreen = ({ navigation }: NavigationProps<Routes.Chat>) => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.ContactListNavigatorRecent}
      screenOptions={{ tabBarHideOnKeyboard: true, headerShown: false }}
      detachInactiveScreens={true}
      sceneContainerStyle={styles.tabScreen}>
      <Tab.Screen
        name={Routes.ContactListNavigatorRecent}
        component={ContactListNavigatorRecent}
        options={{
          tabBarStyle: styles.tabContent,
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GREY,
          title: 'Wiadomości',
          tabBarIcon: ({ color, size }) => <Icon source={'message'} color={color} size={size} />
        }}></Tab.Screen>
      <Tab.Screen
        name={Routes.ContactListNavigatorStable}
        component={ContactListNavigatorStable}
        options={{
          tabBarStyle: styles.tabContent,
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GREY,
          title: 'Lista użytkowników',
          tabBarIcon: ({ color, size }) => (
            <Icon source={'account-search'} size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
export default ChatScreen;
