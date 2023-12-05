import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import { COLOR } from '~/styles/constants';
import MessageChat from '~/screens/Chat/Message';
import PDFViewer from '~/screens/Chat/PDFViewer';
import ContactListRecent from '~/screens/Chat/ContactListRecent/ContactListRecent';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ContactListNavigatorRecent = ({
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
        component={ContactListRecent}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={Routes.Message}
        component={MessageChat}
        options={({ route }) => ({
          headerTitle: route.params.name
        })}
      />
      <Stack.Screen
        name={Routes.PDFViewer}
        component={PDFViewer}
        options={() => ({
          headerTitle: ''
        })}
      />
    </Stack.Navigator>
  );
};

export default ContactListNavigatorRecent;
