// TwilioActions.ts

import { checkVerification, sendSmsVerification } from '~/utils/sendVerifySMS';
import { Dispatch } from 'redux';
import { TwilioActionTypes } from '../types/twilio';

export const sendVerificationRedux =
  (phoneNumber: string) => async (dispatch: Dispatch<TwilioActionTypes>) => {
    dispatch({ type: 'SEND_VERIFICATION_REQUEST' });

    try {
      const response = await sendSmsVerification(phoneNumber);

      if (response) {
        dispatch({ type: 'SEND_VERIFICATION_SUCCESS' });
      } else {
        dispatch({ type: 'SEND_VERIFICATION_FAILURE' });
      }
    } catch (error) {
      dispatch({ type: 'SEND_VERIFICATION_FAILURE' });
    }
  };

export const checkVerificationRedux =
  (phoneNumber: string, code: string) => async (dispatch: Dispatch<TwilioActionTypes>) => {
    dispatch({ type: 'CHECK_VERIFICATION_REQUEST' });

    try {
      const response = await checkVerification(phoneNumber, code);

      if (response) {
        return dispatch({ type: 'CHECK_VERIFICATION_SUCCESS' });
      } else {
        console.log('checkVerificationRedux error');
        return dispatch({ type: 'CHECK_VERIFICATION_FAILURE' });
      }
    } catch (error) {
      console.log('checkVerificationRedux error');
      return dispatch({ type: 'CHECK_VERIFICATION_FAILURE' });
    }
  };

export const clearError = () => (dispatch: Dispatch<TwilioActionTypes>) => {
  dispatch({ type: 'CLEAR_ERROR' });
};
