import { CometChat } from '@cometchat/chat-sdk-react-native';
import { AUTH_KEY_COSMO_CHAT } from '@env';

const authKey: string = AUTH_KEY_COSMO_CHAT;

function login(UID: string) {
  CometChat.getLoggedinUser().then(
    (user) => {
      if (!user) {
        CometChat.login(UID, authKey).then(
          (user: CometChat.User) => {
            console.log('Login Successful:', { user });
          },
          (error: CometChat.CometChatException) => {
            console.log('Login failed with exception:', { error });
          }
        );
      }
    },
    (error: CometChat.CometChatException) => {
      console.log('Some Error Occurred', { error });
    }
  );
}

export default login;
