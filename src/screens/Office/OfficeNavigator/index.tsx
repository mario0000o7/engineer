import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import { COLOR } from '~/styles/constants';
import MessageChat from '~/screens/Chat/Message';
import PDFViewer from '~/screens/Chat/PDFViewer';
import OfficeList from '~/screens/Office/OfficeList';

const Stack = createNativeStackNavigator<RootStackParamList>();

const OfficeNavigator = ({
  navigation,
  route
}: NavigationProps<Routes.ContactListNavigatorRecent>) => {
  return (
    <Stack.Navigator
      initialRouteName={Routes.OfficeList}
      screenOptions={{
        navigationBarColor: COLOR.BACKGROUND
      }}>
      <Stack.Screen
        name={Routes.OfficeList}
        component={OfficeList}
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

export default OfficeNavigator;
