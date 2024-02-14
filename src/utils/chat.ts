import { CometChat } from '@cometchat/chat-sdk-react-native';

import { User } from 'react-native-gifted-chat';
import * as DocumentPicker from 'expo-document-picker';
import CustomMessage, { CustomFile } from '~/types/CustomMessage';
import TextMessage = CometChat.TextMessage;
import MediaMessage = CometChat.MediaMessage;

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

export function mapMessage(message: TextMessage | MediaMessage): CustomMessage[] {
  try {
    if (message instanceof MediaMessage) {
      console.log('Media message:', message);
      return [
        {
          user: mapUser(message.getSender()),
          _id: message.getId(),
          text: '',
          createdAt: new Date(message.getSentAt() * 1000),
          file: {
            uri: message.getAttachment().getUrl(),
            mimeType: message.getAttachment().getMimeType(),
            name: message.getAttachment().getName(),
            extension: message.getAttachment().getExtension()
          }
        }
      ];
    } else {
      console.log('Text message:', message);
      return [
        {
          user: mapUser(message.getSender()),
          _id: message.getId(),
          text: message.getText(),
          createdAt: new Date(message.getSentAt() * 1000)
        }
      ];
    }
  } catch (error) {
    console.log('Error mapping message:', error);
    return [];
  }
}

export const _pickDocument = async (): Promise<CustomFile | null> => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/pdf', 'image/*']
    });

    if (result.canceled) {
      return null;
    }

    return {
      uri: result.assets[0].uri!,
      mimeType: result.assets[0].mimeType!,
      name: result.assets[0].name!,
      extension: result.assets[0].name.split('.').pop() || 'pdf'
    };
  } catch (error) {
    console.log('Error picking document:', error);
    return null;
  }
};
