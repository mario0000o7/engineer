// TwilioReducer.ts

import { TwilioActionTypes, TwilioState } from '../types/twilio';

const initialState: TwilioState = {
  loading: false,
  error: null,
  verificationSent: false,
  verificationChecked: false
};

const twilioReducer = (state = initialState, action: TwilioActionTypes): TwilioState => {
  switch (action.type) {
    case 'SEND_VERIFICATION_REQUEST':
    case 'CHECK_VERIFICATION_REQUEST':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'SEND_VERIFICATION_SUCCESS':
      return {
        ...state,
        loading: false,
        verificationSent: true
      };

    case 'CHECK_VERIFICATION_SUCCESS':
      return {
        ...state,
        loading: false,
        verificationChecked: true
      };

    case 'SEND_VERIFICATION_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Wystąpił błąd podczas wysyłania wiadomości.'
      };
    case 'CHECK_VERIFICATION_FAILURE':
      return {
        ...state,
        loading: false,
        error: 'Wystąpił błąd podczas weryfikacji.'
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        loading: false,
        error: null
      };

    default:
      return state;
  }
};

export default twilioReducer;
