import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './slices/sessionSlice';
import registerReducer from './slices/registerSlice';
import { sessionListenerMiddleware } from './middleware';
import { baseApi } from './api/baseApi';

export const store = configureStore({
  reducer: {
    session: sessionReducer,
    register: registerReducer,
    [baseApi.reducerPath]: baseApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(sessionListenerMiddleware.middleware, baseApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
