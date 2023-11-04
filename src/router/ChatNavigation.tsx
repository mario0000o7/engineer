import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import Message from '~/screens/Message';
import RecentMessages from '~/screens/RecentMessages';
import { COLOR } from '~/styles/constants';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ChatNavigation = ({ navigation, route }: NavigationProps<Routes.ChatNavigation>) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.RecentMessages}
      screenOptions={{ navigationBarColor: COLOR.BACKGROUND }}>
      <Stack.Screen
        name={Routes.RecentMessages}
        component={RecentMessages}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Message}
        component={Message}
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default ChatNavigation;
