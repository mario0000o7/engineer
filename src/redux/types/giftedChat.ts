import CustomMessage from '~/types/CustomMessage';
import { User } from 'react-native-gifted-chat';
import { RegisterState } from '~/redux/slices/registerSlice';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const GET_MESSAGES_REQUEST = 'GET_MESSAGES_REQUEST';
export const GET_MESSAGES_SUCCESS = 'GET_MESSAGES_SUCCESS';
export const GET_MESSAGES_FAILURE = 'GET_MESSAGES_FAILURE';
export const APPEND_MESSAGE = 'APPEND_MESSAGE';

export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';
export const GET_RECENT_CONVERSATIONS_REQUEST = 'GET_RECENT_CONVERSATIONS_REQUEST';
export const GET_RECENT_CONVERSATIONS_SUCCESS = 'GET_RECENT_CONVERSATIONS_SUCCESS';
export const GET_RECENT_CONVERSATIONS_FAILURE = 'GET_RECENT_CONVERSATIONS_FAILURE';

export interface LoginRequestAction {
  type: typeof LOGIN_REQUEST;
}

export interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
}

export interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
}

export interface GetMessagesRequestAction {
  type: typeof GET_MESSAGES_REQUEST;
}

export interface GetMessagesSuccessAction {
  type: typeof GET_MESSAGES_SUCCESS;
}

export interface GetMessagesFailureAction {
  type: typeof GET_MESSAGES_FAILURE;
}

export interface AppendMessageAction {
  type: typeof APPEND_MESSAGE;
  payload: CustomMessage;
}

export interface GetRecentConversationsRequestAction {
  type: typeof GET_RECENT_CONVERSATIONS_REQUEST;
}

export interface GetRecentConversationsSuccessAction {
  type: typeof GET_RECENT_CONVERSATIONS_SUCCESS;
}

export interface GetRecentConversationsFailureAction {
  type: typeof GET_RECENT_CONVERSATIONS_FAILURE;
}

export interface ClearMessagesAction {
  type: typeof CLEAR_MESSAGES;
}

export type GiftedChatActionTypes =
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | GetMessagesRequestAction
  | GetMessagesSuccessAction
  | GetMessagesFailureAction
  | AppendMessageAction
  | GetRecentConversationsRequestAction
  | GetRecentConversationsSuccessAction
  | GetRecentConversationsFailureAction
  | ClearMessagesAction;

export interface GiftedChatState {
  loading: boolean;
  error: string | null;
  messages: CustomMessage[];
  user: User | undefined;
  conversations: RegisterState[];
}
