import { useCallback } from 'react';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import CustomMessage from '~/types/CustomMessage';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { appendMessageRedux } from '~/redux/api/giftedChat';

export const onSend = (receiverID: string, dispatch: ThunkDispatch<any, any, any>) =>
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

    dispatch(appendMessageRedux(message[0])).then();
  }, []);
