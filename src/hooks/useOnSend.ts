import React, { useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import CustomMessage from '~/types/CustomMessage';

export const onSend = (
  receiverID: string,
  setMessage: React.Dispatch<React.SetStateAction<CustomMessage[]>>
) =>
  useCallback((message: CustomMessage[] = []) => {
    let messageText;
    if (message[0].file) {
      const mediaMessage = new CometChat.MediaMessage(
        receiverID,
        message[0].file,
        CometChat.MESSAGE_TYPE.IMAGE,
        CometChat.RECEIVER_TYPE.USER
      );
      CometChat.sendMediaMessage(mediaMessage).then(
        (mediaMessage) => {
          console.log('message', mediaMessage);
        },
        (error) => {
          console.log('error in sending message', error);
        }
      );
    } else {
      messageText = new CometChat.TextMessage(
        receiverID,
        message[0].text,
        CometChat.RECEIVER_TYPE.USER
      );
      CometChat.sendMessage(messageText).then(
        (message) => {
          console.log('Message sent successfully:', message);
        },
        (error: CometChat.CometChatException) => {
          console.log('Message sending failed with exception:', error);
        }
      );
    }

    setMessage((previousMessages) => GiftedChat.append(previousMessages, message));
  }, []);
