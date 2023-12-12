import { GiftedChatActionTypes } from '~/redux/types/giftedChat';
import { Dispatch } from 'redux';
import login from '~/utils/login';
import { IMessage } from 'react-native-gifted-chat';
import { mapMessage, mapUser } from '~/utils/chat';
import { CometChat } from '@cometchat/chat-sdk-react-native';
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  MutationDefinition
} from '@reduxjs/toolkit/query';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { RegisterState } from '~/redux/slices/registerSlice';
import createUser from '~/utils/createUser';
import TextMessage = CometChat.TextMessage;
import MediaMessage = CometChat.MediaMessage;

export const loginUserRedux =
  (id: string, mail: string, role: number) => async (dispatch: Dispatch<GiftedChatActionTypes>) => {
    dispatch({ type: 'LOGIN_REQUEST' });

    try {
      const result = await login(id);
      const user = await CometChat.getLoggedinUser();
      console.log('User:', user);

      dispatch({ type: 'LOGIN_SUCCESS', payload: mapUser(user!) });
      return result;
    } catch (error) {
      try {
        await createUser(id, mail, role);
        await login(id);
        const user = await CometChat.getLoggedinUser();
        dispatch({ type: 'LOGIN_SUCCESS', payload: mapUser(user!) });
      } catch (error) {
        dispatch({ type: 'LOGIN_FAILURE' });
      }
      return null;
    }
  };

export const getMessagesRedux =
  (receiverIdString: string) => async (dispatch: Dispatch<GiftedChatActionTypes>) => {
    dispatch({ type: 'CLEAR_MESSAGES' });
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
            CometChat.markAsRead(messages[i] as TextMessage | MediaMessage);
            messageList = messageList.concat(mapMessage(messages[i] as TextMessage | MediaMessage));
          }

          dispatch({
            type: 'GET_MESSAGES_SUCCESS',
            payload: { messages: messageList.reverse() }
          });
        },
        (error) => {
          console.log('Message fetching failed with error:', error);
          dispatch({ type: 'GET_MESSAGES_FAILURE' });
        }
      );
    } catch (error) {
      dispatch({ type: 'GET_MESSAGES_FAILURE' });
    }
  };

export const appendMessageRedux =
  (message: IMessage) => async (dispatch: Dispatch<GiftedChatActionTypes>) => {
    dispatch({ type: 'APPEND_MESSAGE', payload: message });
  };

export const getRecentConversationsStatesRedux =
  (
    getUserByIds: MutationTrigger<
      MutationDefinition<
        { ids: number[] },
        BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>,
        'User',
        any
      >
    >
  ) =>
  async (dispatch: Dispatch<GiftedChatActionTypes>) => {
    dispatch({ type: 'GET_RECENT_CONVERSATIONS_REQUEST' });
    try {
      const conversationsRequest: CometChat.ConversationsRequest =
        new CometChat.ConversationsRequestBuilder()
          .setLimit(30)
          .setConversationType('user')
          .build();
      const uidList: number[] = [];
      const unreadMessageCountList: number[] = [];

      await conversationsRequest.fetchNext().then(
        async (conversationList: CometChat.Conversation[]) => {
          for (let i = 0; i < conversationList.length; i++) {
            const user = conversationList[i].getConversationWith();
            unreadMessageCountList.push(conversationList[i].getUnreadMessageCount());
            if (user instanceof CometChat.User) {
              uidList.push(parseInt(user.getUid()));
            }
          }
          getUserByIds({ ids: uidList.reverse() })
            .unwrap()
            .then((value: RegisterState[]) => {
              let userList: RegisterState[] = [];
              for (let i = value.length - 1; i >= 0; i--) {
                userList = userList.concat({
                  ...value[i],
                  unReadMessages: unreadMessageCountList[i]
                });
              }
              dispatch({
                type: 'GET_RECENT_CONVERSATIONS_SUCCESS',
                payload: userList
              });
            });
        },
        (error: CometChat.CometChatException) => {
          dispatch({ type: 'GET_RECENT_CONVERSATIONS_FAILURE' });
          console.log('Conversations list fetching failed with error:', error);
        }
      );
      return uidList;
    } catch (error) {
      dispatch({ type: 'GET_RECENT_CONVERSATIONS_FAILURE' });
    }
  };
