import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
// @ts-ignore
import { APP_ID_COSMO_CHAT, REGION_COSMO_CHAT } from '@env';
import MyDrawer from './src/router/MyDrawer';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CometChat } from '@cometchat/chat-sdk-react-native';

export default function App() {
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
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <MyDrawer />
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
