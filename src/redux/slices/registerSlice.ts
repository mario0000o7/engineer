import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RegisterState {
  id?: number;
  password: string;
  email: string;
  phone: string;
  role: number;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  gender?: string;
  title?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  unReadMessages?: number;
  phoneCode?: string;
}

const initialState: RegisterState = {
  email: '',
  password: '',
  phone: '',
  role: 0,
  firstName: '',
  lastName: '',
  birthDate: new Date(),
  gender: '',
  unReadMessages: 0,
  title: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  postalCode: '',
  phoneCode: ''
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
    },
    setGender(state, action: PayloadAction<string>) {
      state.gender = action.payload;
    },
    setUnReadMessages(state, action: PayloadAction<number>) {
      state.unReadMessages = action.payload;
    },
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setAddress1(state, action: PayloadAction<string>) {
      state.address1 = action.payload;
    },
    setAddress2(state, action: PayloadAction<string>) {
      state.address2 = action.payload;
    },
    setCity(state, action: PayloadAction<string>) {
      state.city = action.payload;
    },
    setCountry(state, action: PayloadAction<string>) {
      state.country = action.payload;
    },
    setPostalCode(state, action: PayloadAction<string>) {
      state.postalCode = action.payload;
    },
    setPhoneCode(state, action: PayloadAction<string>) {
      state.phoneCode = action.payload;
    }
  }
});

export const {
  setEmail,
  setPassword,
  setPhone,
  setRole,
  setFirstName,
  setLastName,
  setBirthDate,
  setGender,
  setTitle,
  setAddress1,
  setAddress2,
  setCity,
  setCountry,
  setPostalCode,
  setPhoneCode,
  setUnReadMessages
} = registerSlice.actions;

export default registerSlice.reducer;
