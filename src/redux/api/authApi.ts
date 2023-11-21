import { RegisterState } from '../slices/registerSlice';
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, { email: string; password: string }>({
      query: (data) => ({
        method: 'POST',
        url: '/user/login',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    register: builder.mutation<{ token: string }, RegisterState>({
      query: (data) => ({
        method: 'POST',
        url: '/user/register',
        body: data
      }),
      invalidatesTags: ['User']
    }),
    checkEmail: builder.mutation<{ userExists: boolean }, { email: string }>({
      query: (data) => ({
        method: 'POST',
        url: '/user/checkEmail',
        body: data
      })
    })
  })
});

export const { useLoginMutation, useRegisterMutation, useCheckEmailMutation } = authApi;
