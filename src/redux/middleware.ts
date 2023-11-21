/* eslint-disable no-unused-vars */

import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { RootState } from './store';
import { clearCurrentSessionData, logOut, setToken } from './slices/sessionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'AUTH_TOKEN';

export const sessionListenerMiddleware = createListenerMiddleware();

sessionListenerMiddleware.startListening({
  matcher: isAnyOf(setToken, logOut, clearCurrentSessionData),
  effect: async (_action, listenerApi) => {
    const token = (listenerApi.getState() as RootState).session.token ?? '';
    await AsyncStorage.setItem(AUTH_KEY, token);
  }
});
