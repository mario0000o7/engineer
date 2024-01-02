import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
// @ts-ignore
import { APP_ID_COSMO_CHAT, REGION_COSMO_CHAT } from '@env';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { CometChat } from '@cometchat/chat-sdk-react-native';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { Poppins_400Regular, Poppins_600SemiBold, useFonts } from '@expo-google-fonts/poppins';
import { LogBox, Platform } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import RegisterNavigation from './src/router/registerNavigation';
import { StatusBar } from 'expo-status-bar';

// Ignore log notification by message
LogBox.ignoreLogs(['Warning: ...']);

//Ignore all log notifications
LogBox.ignoreAllLogs();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
});

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C'
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      // alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants.expoConfig!.extra!.eas.projectId
    });
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  return token!.data;
}

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token!));

    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current!);
      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);
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
