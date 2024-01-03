import { RegisterState } from '../slices/registerSlice';
import { baseApi } from './baseApi';
import { OfficeState } from '~/types/office';
import { ServiceState } from '~/types/service';
import { AppointmentState } from '~/types/appointment';
import { DayOffState } from '~/types/dayOff';

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
    }),
    createOffice: builder.mutation<void, OfficeState>({
      query: (data) => ({
        method: 'POST',
        url: '/office/create',
        body: data
      })
    }),
    getOfficesByIdOwner: builder.mutation<[OfficeState], { ownerId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/office/retrieveByOwnerId',
        body: data
      })
    }),
    updateOffice: builder.mutation<number, OfficeState>({
      query: (data) => ({
        method: 'POST',
        url: '/office/update',
        body: data
      })
    }),
    deleteOffice: builder.mutation<number, { officeId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/office/delete',
        body: data
      })
    }),
    createService: builder.mutation<ServiceState, ServiceState>({
      query: (data) => ({
        method: 'POST',
        url: '/service/create',
        body: data
      })
    }),
    getServicesByIdOwner: builder.mutation<[ServiceState], { officeId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/service/retrieveAllByOfficeId',
        body: data
      })
    }),
    deleteService: builder.mutation<number, { serviceId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/service/delete',
        body: data
      })
    }),
    updateService: builder.mutation<number, ServiceState>({
      query: (data) => ({
        method: 'POST',
        url: '/service/update',
        body: data
      })
    }),
    retrieveAll: builder.mutation<OfficeState[], { nameOffice: string }>({
      query: (data) => ({
        method: 'POST',
        url: '/office/retrieveAll',
        body: data
      })
    }),
    readAvailableDatesForService: builder.mutation<Date[], { serviceId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/appointment/readAvailableDatesForService',
        body: data
      })
    }),
    createAppointment: builder.mutation<void, AppointmentState>({
      query: (data) => ({
        method: 'POST',
        url: '/appointment/create',
        body: data
      })
    }),
    getAppointmentsByUserId: builder.mutation<AppointmentState[], { userId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/appointment/getAppointmentsByUserId',
        body: data
      })
    }),
    getAppointmentsByDoctorId: builder.mutation<AppointmentState[], { userId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/appointment/getAppointmentsByDoctorId',
        body: data
      })
    }),
    moveAppointment: builder.mutation<number, { appointmentId: number; date: Date }>({
      query: (data) => ({
        method: 'POST',
        url: '/appointment/moveAppointment',
        body: data
      })
    }),
    deleteAppointment: builder.mutation<number, { appointmentId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/appointment/delete',
        body: data
      })
    }),
    updateUser: builder.mutation<number, RegisterState>({
      query: (data) => ({
        method: 'POST',
        url: '/user/update',
        body: data
      })
    }),
    getAllDaysOffRetrieveByUserId: builder.mutation<DayOffState[], { userId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/dayOff/retrieveByUserId',
        body: data
      })
    }),
    createDayOff: builder.mutation<DayOffState, DayOffState>({
      query: (data) => ({
        method: 'POST',
        url: '/dayOff/create',
        body: data
      })
    }),
    updateDayOff: builder.mutation<number, DayOffState>({
      query: (data) => ({
        method: 'POST',
        url: '/dayOff/update',
        body: data
      })
    }),
    deleteDayOff: builder.mutation<number, { dayOffId: number }>({
      query: (data) => ({
        method: 'POST',
        url: '/dayOff/delete',
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
  useGetAllUsersMutation,
  useCreateOfficeMutation,
  useGetOfficesByIdOwnerMutation,
  useUpdateOfficeMutation,
  useDeleteOfficeMutation,
  useCreateServiceMutation,
  useGetServicesByIdOwnerMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
  useRetrieveAllMutation,
  useReadAvailableDatesForServiceMutation,
  useCreateAppointmentMutation,
  useGetAppointmentsByDoctorIdMutation,
  useGetAppointmentsByUserIdMutation,
  useMoveAppointmentMutation,
  useDeleteAppointmentMutation,
  useUpdateUserMutation,
  useGetAllDaysOffRetrieveByUserIdMutation,
  useCreateDayOffMutation,
  useDeleteDayOffMutation,
  useUpdateDayOffMutation
} = authApi;
