import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface RegisterState {
  username: string;
  password: string;
  email: string;
}

const initialState: RegisterState = {
  username: '',
  email: '',
  password: ''
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setName(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    }
  }
});

export const { setEmail, setPassword, setName } = registerSlice.actions;

export default registerSlice.reducer;
