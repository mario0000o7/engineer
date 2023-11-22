import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegisterState {
  password: string;
  email: string;
  phone: string;
  role: number;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
}

const initialState: RegisterState = {
  email: '',
  password: '',
  phone: '',
  role: 0,
  firstName: '',
  lastName: '',
  birthDate: new Date()
};

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    setRole(state, action: PayloadAction<number>) {
      state.role = action.payload;
    },
    setFirstName(state, action: PayloadAction<string>) {
      state.firstName = action.payload;
    },
    setLastName(state, action: PayloadAction<string>) {
      state.lastName = action.payload;
    },
    setBirthDate(state, action: PayloadAction<Date>) {
      state.birthDate = action.payload;
    }
  }
});

export const { setEmail, setPassword, setPhone, setRole, setFirstName, setLastName, setBirthDate } =
  registerSlice.actions;

export default registerSlice.reducer;
