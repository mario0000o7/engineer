import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import registerReducer from './slices/registerSlice';
import giftedChatReducer from '~/redux/reducers/giftedChatReducer';
import { sessionListenerMiddleware } from './middleware';
import { baseApi } from './api/baseApi';
import twilioReducer from '~/redux/reducers/twilioReducer';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    register: registerReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    twilio: twilioReducer,
    chat: giftedChatReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sessionListenerMiddleware.middleware, baseApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
