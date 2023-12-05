import { CometChat } from '@cometchat/chat-sdk-react-native';
import { AUTH_KEY_COSMO_CHAT } from '@env';

const authKey: string = AUTH_KEY_COSMO_CHAT;

function login(UID: string): Promise<CometChat.User | null> {
  return CometChat.getLoggedinUser()
    .then((user) => {
      if (!user) {
        return CometChat.login(UID, authKey).then(
          (loggedInUser: CometChat.User) => {
            console.log('Login Successful:', { loggedInUser });
            return loggedInUser;
          },
          (error: CometChat.CometChatException) => {
            console.log('Login failed with exception:', { error });
            return null;
          }
        );
      } else {
        return user; // Return already logged-in user
      }
    })
    .catch((error: CometChat.CometChatException) => {
      console.log('Some Error Occurred', { error });
      return null;
    });
}

export default login;
