import { GiftedChatActionTypes } from '~/redux/types/giftedChat';
import { Dispatch } from 'redux';
import login from '~/utils/login';
import { IMessage } from 'react-native-gifted-chat';
import { mapMessage } from '~/utils/chat';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import TextMessage = CometChat.TextMessage;
import MediaMessage = CometChat.MediaMessage;

export const loginUserRedux = (id: string) => async (dispatch: Dispatch<GiftedChatActionTypes>) => {
  dispatch({ type: 'LOGIN_REQUEST' });

  try {
    login(id);
    dispatch({ type: 'LOGIN_SUCCESS' });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAILURE' });
  }
};

export const getMessagesRedux =
  (idString: string, receiverIdString: string) =>
  async (dispatch: Dispatch<GiftedChatActionTypes>) => {
    dispatch({ type: 'GET_MESSAGES_REQUEST' });

    try {
      const messagesRequest = new CometChat.MessagesRequestBuilder()
        .setUID(receiverIdString)
        .setLimit(30)
        .build();
      messagesRequest.fetchPrevious().then(
        (messages) => {
          let messageList: IMessage[] = [];
          for (let i = 0; i < messages.length; i++) {
            messageList = messageList.concat(mapMessage(messages[i] as TextMessage | MediaMessage));
          }
          const user = messageList.find((value) => value.user._id === idString)?.user!;
          dispatch({
            type: 'GET_MESSAGES_SUCCESS',
            payload: { messages: messageList.reverse(), user: user }
          });
        },
        (error) => {
          console.log('Message fetching failed with error:', error);
        }
      );
    } catch (error) {
      dispatch({ type: 'GET_MESSAGES_FAILURE' });
    }
  };

export const appendMessageRedux =
  (message: IMessage) => async (dispatch: Dispatch<GiftedChatActionTypes>) => {
    console.log('appendMessageRedux');
    dispatch({ type: 'APPEND_MESSAGE', payload: message });
  };
