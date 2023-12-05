import { GiftedChatState } from '~/redux/types/giftedChat';

const initialState: GiftedChatState = {
  loading: false,
  error: null,
  messages: [],
  user: undefined,
  conversations: []
};

const giftedChatReducer = (state = initialState, action: any): GiftedChatState => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
    case 'GET_MESSAGES_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'LOGIN_SUCCESS':
      return {
        ...state,
        loading: false
      };

    case 'GET_MESSAGES_SUCCESS':
      return {
        ...state,
        loading: false,
        messages: action.payload.messages,
        user: action.payload.user
      };

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Wystąpił błąd podczas logowania.'
      };
    case 'GET_MESSAGES_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Wystąpił błąd podczas pobierania wiadomości.'
      };
    case 'APPEND_MESSAGE':
      return {
        ...state,
        messages: [action.payload, ...state.messages]
      };
    case 'GET_RECENT_CONVERSATIONS_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'GET_RECENT_CONVERSATIONS_SUCCESS':
      return {
        ...state,
        loading: false,
        conversations: action.payload
      };
    case 'GET_RECENT_CONVERSATIONS_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Wystąpił błąd podczas pobierania wiadomości.'
      };
    case 'CLEAR_MESSAGES':
      return {
        ...state,
        messages: []
      };

    default:
      return state;
  }
};
export default giftedChatReducer;
