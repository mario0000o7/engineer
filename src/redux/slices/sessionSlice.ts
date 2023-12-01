import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Jwt } from '~/types/common';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'AUTH_TOKEN';
export const preloadToken = createAsyncThunk('preloadToken', async () => {
  const token = await AsyncStorage.getItem(AUTH_KEY);

  return {
    token: token ?? undefined
  };
});

interface JwtProps {
  id: number;
  email: string;
}

export interface SessionState {
  token?: Jwt;
  id?: number;
  email?: string;
}

const initialState: SessionState = {};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Jwt>) {
      state.token = action.payload;
      const decoded = jwtDecode(action.payload) as JwtProps;
      console.log(decoded);
      state.id = decoded.id;
      state.email = decoded.email;
    },
    clearCurrentSessionData(state) {
      state.token = undefined;
    },
    logOut(state) {
      sessionSlice.caseReducers.clearCurrentSessionData(state);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(preloadToken.fulfilled, (state, action) => {
      state.token = action.payload.token;
    });
  }
});

export const { setToken, logOut, clearCurrentSessionData } = sessionSlice.actions;

export default sessionSlice.reducer;
