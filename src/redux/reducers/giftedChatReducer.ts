import { GiftedChatState } from '~/redux/types/giftedChat';

const initialState: GiftedChatState = {
  loading: false,
  error: null,
  messages: [],
  user: undefined
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
      console.log('GET_MESSAGES_SUCCESS');
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

    default:
      return state;
  }
};
export default giftedChatReducer;
