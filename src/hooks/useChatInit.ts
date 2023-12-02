import React, { useCallback } from 'react';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { mapMessage } from '~/utils/chat';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import createUser from '~/utils/createUser';
import login from '~/utils/login';
import TextMessage = CometChat.TextMessage;
import CustomMessage = CometChat.CustomMessage;
import MediaMessage = CometChat.MediaMessage;

export const useChatInit = (
  id: number,
  receiverId: number,
  email: string | undefined,
  setMessage: React.Dispatch<React.SetStateAction<IMessage[]>>,
  setUser: React.Dispatch<React.SetStateAction<User>>
) =>
  useCallback(() => {
    const idString = id.toString();
    const receiverIdString = receiverId.toString();
    createUser(idString!, email!);
    login(idString!);
    const messagesRequest = new CometChat.MessagesRequestBuilder()
      .setUID(receiverIdString)
      .setLimit(30)
      .build();
    console.log('ID', idString);
    messagesRequest.fetchPrevious().then(
      (messages) => {
        let messageList: IMessage[] = [];
        for (let i = 0; i < messages.length; i++) {
          messageList = messageList.concat(mapMessage(messages[i] as TextMessage));
        }
        setUser(messageList.find((value) => value.user._id === idString)?.user!);
        setMessage(messageList.reverse());
      },
      (error) => {
        console.log('Message fetching failed with error:', error);
      }
    );
    const listenerID = id!.toString();
    CometChat.addMessageListener(
      listenerID,
      new CometChat.MessageListener({
        onTextMessageReceived: (textMessage: TextMessage) => {
          setMessage((previousMessages) =>
            GiftedChat.append(previousMessages, mapMessage(textMessage))
          );
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
