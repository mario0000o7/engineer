/* eslint-disable no-unused-vars */

import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import * as SecureStore from 'expo-secure-store';
import { RootState } from './store';
import { clearCurrentSessionData, logOut, setToken } from './slices/sessionSlice';

const AUTH_KEY = 'AUTH_TOKEN';

export const sessionListenerMiddleware = createListenerMiddleware();

sessionListenerMiddleware.startListening({
  matcher: isAnyOf(setToken, logOut, clearCurrentSessionData),
  effect: async (_action, listenerApi) => {
    const token = (listenerApi.getState() as RootState).session.token ?? '';
    await SecureStore.setItemAsync(AUTH_KEY, token);
  }
});
