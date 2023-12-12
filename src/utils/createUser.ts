import { CometChat } from '@cometchat/chat-sdk-react-native';

import { AUTH_KEY_COSMO_CHAT } from '@env';

const authKey: string = AUTH_KEY_COSMO_CHAT;

function createUser(UID: string, name: string, role: number) {
  const user = new CometChat.User(UID);
  if (role === 1) {
    user.setRole('doktor');
  }
  if (role === 2) {
    user.setRole('pacjent');
  }

  user.setName(name);

  CometChat.createUser(user, authKey).then(
    (user: CometChat.User) => {
      console.log('user created', user);
    },
    (error: CometChat.CometChatException) => {
      console.log('error', error);
      throw error;
    }
  );
}

export default createUser;
