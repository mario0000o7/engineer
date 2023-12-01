import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
// @ts-ignore
import { APP_ID_COSMO_CHAT, REGION_COSMO_CHAT } from '@env';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CometChat } from '@cometchat/chat-sdk-react-native';
import RegisterNavigation from './src/router/registerNavigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold
  });

  const appID: string = APP_ID_COSMO_CHAT;
  const region: string = REGION_COSMO_CHAT;
  const appSetting: CometChat.AppSettings = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .autoEstablishSocketConnection(true)
    .build();
  CometChat.init(appID, appSetting).then(
    (initialized: boolean) => {
      console.log('Initialization completed successfully', initialized);
    },
    (error: CometChat.CometChatException) => {
      console.log('Initialization failed with error:', error);
    }
  );
  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <Provider store={store}>
      <PaperProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <>
              <StatusBar style="auto" />
              <RegisterNavigation />
            </>
          </NavigationContainer>
        </SafeAreaProvider>
      </PaperProvider>
    </Provider>
  );
}
