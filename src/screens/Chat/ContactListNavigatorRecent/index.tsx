import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProps, RootStackParamList, Routes } from '~/router/navigationTypes';
import { Text, View } from 'react-native-ui-lib';

const Stack = createNativeStackNavigator<RootStackParamList>();

const ContactListNavigatorRecent = ({
  navigation,
  route
}: NavigationProps<Routes.ContactListNavigatorRecent>) => {
  return (
    // <Stack.Navigator
    //   initialRouteName={Routes.RecentMessages}
    //   screenOptions={{
    //     navigationBarColor: COLOR.BACKGROUND
    //   }}>
    //   <Stack.Screen
    //     name={Routes.RecentMessages}
    //     component={RecentMessages}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name={Routes.Message}
    //     component={MessageChat}
    //     options={{
    //       headerShown: false
    //     }}
    //   />
    // </Stack.Navigator>
    <View>
      <Text>Nothing</Text>
    </View>
  );
};

export default ContactListNavigatorRecent;
