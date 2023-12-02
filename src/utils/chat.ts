import { CometChat } from '@cometchat/chat-sdk-react-native';

import { IMessage, User } from 'react-native-gifted-chat';
import * as DocumentPicker from 'expo-document-picker';
import TextMessage = CometChat.TextMessage;

export function mapUser(user: CometChat.User | CometChat.Group): User {
  if (user instanceof CometChat.Group) {
    return {
      _id: user.getGuid(),
      name: user.getName(),
      avatar: user.getIcon()
    };
  }
  return {
    _id: user.getUid(),
    name: user.getName(),
    avatar: user.getAvatar()
  };
}

export function mapMessage(message: TextMessage): IMessage[] {
  return [
    {
      user: mapUser(message.getSender()),
      _id: message.getId(),
      text: message.getText(),
      createdAt: new Date(message.getSentAt() * 1000)
    }
  ];
}

export const _pickDocument = async () => {
  const result = await DocumentPicker.getDocumentAsync({
    type: 'application/pdf'
  });
  if (result.canceled) {
    return;
  }
  const file = {
    uri: result.assets![0].uri,
    type: 'application/pdf',
    name: result.assets![0].name
  };
  // setFile(file);
};
