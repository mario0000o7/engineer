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
    checkPhone: builder.mutation<{ userExists: boolean }, { phone: string }>({
      query: (data) => ({
        method: 'POST',
        url: '/user/checkPhone',
        body: data
      })
    }),
    checkEmail: builder.mutation<{ userExists: boolean }, { email: string }>({
      query: (data) => ({
        method: 'POST',
        url: '/user/checkEmail',
        body: data
      })
    }),
    findUser: builder.mutation<[RegisterState], { fullName: string; role: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/user/findUser',
        body: data
      })
    }),
    getAllUsers: builder.mutation<[RegisterState], { role: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/user/getAllUser',
        body: data
      })
    }),
    getUserByIds: builder.mutation<[RegisterState], { ids: number[] }>({
      query: (data) => ({
        method: 'POST',
        url: '/user/getUserByIds',
        body: data
      })
    })
  })
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCheckPhoneMutation,
  useCheckEmailMutation,
  useFindUserMutation,
  useGetUserByIdsMutation,
  useGetAllUsersMutation
} = authApi;
