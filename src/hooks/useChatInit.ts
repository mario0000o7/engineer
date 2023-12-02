import { useCallback } from 'react';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import { appendMessageRedux, getMessagesRedux, loginUserRedux } from '~/redux/api/giftedChat';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { mapMessage } from '~/utils/chat';
import TextMessage = CometChat.TextMessage;
import CustomMessage = CometChat.CustomMessage;
import MediaMessage = CometChat.MediaMessage;

export const useChatInit = (
  id: number,
  receiverId: number,
  dispatch: ThunkDispatch<any, any, any>
) =>
  useCallback(() => {
    dispatch(loginUserRedux(id.toString())).then();

    dispatch(getMessagesRedux(id.toString(), receiverId.toString())).then();
    const listenerID = id!.toString();
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: TextMessage) => {
          dispatch(appendMessageRedux(mapMessage(textMessage)[0])).then();

          console.log('Text message received successfully', textMessage);
        },
        onMediaMessageReceived: (mediaMessage: MediaMessage) => {
          console.log('Media message received successfully', mediaMessage);
        },
        onCustomMessageReceived: (customMessage: CustomMessage) => {
          console.log('Custom message received successfully', customMessage);
        }
      })
    );
    return () => {
      CometChat.removeMessageListener(listenerID);
    };
    // startSession();
  }, []);
