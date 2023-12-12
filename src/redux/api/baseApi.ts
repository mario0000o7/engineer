import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
// import { RootState } from '~/redux/store';

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `http://192.168.0.11:8080/api`,
    prepareHeaders: (headers, { getState }) => {
      const session = (getState() as RootState).session;
      if (session.token) {
        headers.set('Authorization', `Bearer ${session.token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['User'],
  endpoints: () => ({})
});
