import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DoctorList from '~/screens/DoctorList';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import Icon from 'react-native-paper/src/components/Icon';
import styles from '~/screens/Chat/styles';
import RecentMessages from '~/screens/RecentMessages';
import { COLOR } from '~/styles/constants';

const Tab = createBottomTabNavigator<RootStackParamList>();

const ChatScreen = ({ navigation }: NavigationProps<Routes.Chat>) => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.RecentMessages}
      screenOptions={{ tabBarHideOnKeyboard: true }}
      detachInactiveScreens={true}
      sceneContainerStyle={styles.tabScreen}>
      <Tab.Screen
        name={Routes.RecentMessages}
        component={RecentMessages}
        options={{
          tabBarStyle: styles.tabContent,
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GREY,

          tabBarIcon: ({ color, size }) => <Icon source={'message'} color={color} size={size} />
        }}
      />
      <Tab.Screen
        name={Routes.DoctorList}
        component={DoctorList}
        options={{
          tabBarStyle: styles.tabContent,
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GREY,
          tabBarIcon: ({ color, size }) => (
            <Icon source={'account-search'} size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
export default ChatScreen;
