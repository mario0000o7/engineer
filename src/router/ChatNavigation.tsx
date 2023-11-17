import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import MessageChat from '~/screens/Message';
import RecentMessages from '~/screens/RecentMessages';
import { COLOR } from '~/styles/constants';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ChatNavigation = ({ navigation, route }: NavigationProps<Routes.ChatNavigation>) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.RecentMessages}
      screenOptions={{
        navigationBarColor: COLOR.BACKGROUND
      }}>
      <Stack.Screen
        name={Routes.RecentMessages}
        component={RecentMessages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Message}
        component={MessageChat}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
