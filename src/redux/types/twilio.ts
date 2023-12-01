// TwilioActionTypes.ts

export const SEND_VERIFICATION_REQUEST = 'SEND_VERIFICATION_REQUEST';
export const SEND_VERIFICATION_SUCCESS = 'SEND_VERIFICATION_SUCCESS';
export const SEND_VERIFICATION_FAILURE = 'SEND_VERIFICATION_FAILURE';

export const CHECK_VERIFICATION_REQUEST = 'CHECK_VERIFICATION_REQUEST';
export const CHECK_VERIFICATION_SUCCESS = 'CHECK_VERIFICATION_SUCCESS';
export const CHECK_VERIFICATION_FAILURE = 'CHECK_VERIFICATION_FAILURE';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export interface SendVerificationRequestAction {
  type: typeof SEND_VERIFICATION_REQUEST;
}

export interface SendVerificationSuccessAction {
  type: typeof SEND_VERIFICATION_SUCCESS;
}

export interface SendVerificationFailureAction {
  type: typeof SEND_VERIFICATION_FAILURE;
}

export interface CheckVerificationRequestAction {
  type: typeof CHECK_VERIFICATION_REQUEST;
}

export interface CheckVerificationSuccessAction {
  type: typeof CHECK_VERIFICATION_SUCCESS;
}

export interface CheckVerificationFailureAction {
  type: typeof CHECK_VERIFICATION_FAILURE;
}

export interface ClearErrorAction {
  type: typeof CLEAR_ERROR;
}

export type TwilioActionTypes =
  | SendVerificationRequestAction
  | SendVerificationSuccessAction
  | SendVerificationFailureAction
  | CheckVerificationRequestAction
  | CheckVerificationSuccessAction
  | CheckVerificationFailureAction
  | ClearErrorAction;

export interface TwilioState {
  loading: boolean;
  error: string | null;
  verificationSent: boolean;
  verificationChecked: boolean;
}
