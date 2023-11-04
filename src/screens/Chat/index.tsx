import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import Icon from 'react-native-paper/src/components/Icon';
import styles from '~/screens/Chat/styles';
import { COLOR } from '~/styles/constants';
import ChatNavigation from '~/router/ChatNavigation';
import RecentMessages from '~/screens/RecentMessages';

const Tab = createBottomTabNavigator<RootStackParamList>();
export interface ParentNavigationProps {
  parentNavigation: NavigationProps<Routes.Chat>['navigation'];
}
import Animated from 'react-native-reanimated';

const ChatScreen = ({ navigation }: NavigationProps<Routes.Chat>) => {
  return (
    <Tab.Navigator
      initialRouteName={Routes.ChatNavigation}
      screenOptions={{ tabBarHideOnKeyboard: true }}
      detachInactiveScreens={true}
      sceneContainerStyle={styles.tabScreen}>
      <Tab.Screen
        name={Routes.ChatNavigation}
        component={ChatNavigation}
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
        name={Routes.RecentMessages}
        component={RecentMessages}
        options={{
          tabBarStyle: styles.tabContent,
          headerShown: false,
          tabBarLabelStyle: styles.tabLabel,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GREY,
            title: 'Lista lekarzy',
          tabBarIcon: ({ color, size }) => (
            <Icon source={'account-search'} size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
};
export default ChatScreen;
