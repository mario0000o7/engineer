import React, { useCallback } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import CustomMessage from '~/types/CustomMessage';

export const onSend = (
  receiverID: string,
  setMessage: React.Dispatch<React.SetStateAction<CustomMessage[]>>
) =>
  useCallback((message: CustomMessage[] = []) => {
    const messageText = new CometChat.TextMessage(
      receiverID,
      message[0].text,
      CometChat.RECEIVER_TYPE.USER
    );
    console.log(messageText);
    CometChat.sendMessage(messageText).then(
      (message) => {
        console.log('Message sent successfully:', message);
      },
      (error: CometChat.CometChatException) => {
        console.log('Message sending failed with exception:', error);
      }
    );
    console.log(message);
    setMessage((previousMessages) => GiftedChat.append(previousMessages, message));
  }, []);
