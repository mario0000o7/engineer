import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import { COLOR } from '~/styles/constants';
import MessageChat from '~/screens/Chat/Message';
import ContactListAll from '~/screens/Chat/ContactListAll';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ContactListNavigatorStable = ({
  navigation,
  route
}: NavigationProps<Routes.ContactListNavigatorStable>) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.RecentMessages}
      screenOptions={{
        navigationBarColor: COLOR.BACKGROUND
      }}>
      <Stack.Screen
        name={Routes.ContactListAll}
        component={ContactListAll}
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

export default ContactListNavigatorStable;
