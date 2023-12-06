import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Jwt } from '~/types/common';
import { jwtDecode } from 'jwt-decode';
import 'core-js/stable/atob';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'AUTH_TOKEN';
export const preloadToken = createAsyncThunk('preloadToken', async () => {
  const token = await AsyncStorage.getItem(AUTH_KEY);
  const decoded = jwtDecode(token ?? '') as JwtProps;

  return {
    token: token ?? undefined,
    id: decoded.id ?? undefined,
    email: decoded.email ?? undefined,
    role: decoded.role ?? undefined
  };
});

export interface JwtProps {
  id: number;
  email: string;
  role: number;
}

export interface SessionState {
  token?: Jwt;
  id?: number;
  email?: string;
  role?: number;
}

const initialState: SessionState = {};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<Jwt>) {
      state.token = action.payload;
      const decoded = jwtDecode(action.payload) as JwtProps;
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
      state.id = action.payload.id;
      state.email = action.payload.email;
      state.role = action.payload.role;
    });
  }
});

export const { setToken, logOut, clearCurrentSessionData } = sessionSlice.actions;

export default sessionSlice.reducer;
