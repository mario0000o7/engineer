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
      query: (phone) => ({
        method: 'GET',
        url: '/user/checkPhone?phone=' + phone
      })
    }),
    checkEmail: builder.mutation<{ userExists: boolean }, { email: string }>({
      query: (email) => ({
        method: 'GET',
        url: '/user/checkEmail?email=' + email
      })
    }),
    findUser: builder.mutation<[RegisterState], { fullName: string; role: number }>({
      query: ({ fullName, role }) => ({
        method: 'GET',
        url: `/user/findUser?fullName=${fullName}&role=${role}`
      })
    }),
    getAllUsers: builder.mutation<[RegisterState], { role: number }>({
      query: ({ role }) => ({
        method: 'GET',
        url: `/user/getAllUser?role=${role}`
      })
    }),
    getUserByIds: builder.mutation<[RegisterState], { ids: number[] }>({
      query: ({ ids }) => ({
        method: 'GET',
        url: `/user/getUserByIds?ids=${ids.join(',')}`
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
      query: ({ ownerId }) => ({
        method: 'GET',
        url: `/office/retrieveByOwnerId?ownerId=${ownerId}`
      })
    }),
    updateOffice: builder.mutation<number, OfficeState>({
      query: (data) => ({
        method: 'PUT',
        url: '/office/update',
        body: data
      })
    }),
    deleteOffice: builder.mutation<number, { officeId: number }>({
      query: (data) => ({
        method: 'DELETE',
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
      query: ({ officeId }) => ({
        method: 'GET',
        url: `/service/retrieveAllByOfficeId?officeId=${officeId}`
      })
    }),
    deleteService: builder.mutation<number, { serviceId: number }>({
      query: (data) => ({
        method: 'DELETE',
        url: '/service/delete',
        body: data
      })
    }),
    updateService: builder.mutation<number, ServiceState>({
      query: (data) => ({
        method: 'PUT',
        url: '/service/update',
        body: data
      })
    }),
    retrieveAll: builder.mutation<OfficeState[], { nameOffice: string }>({
      query: ({ nameOffice }) => ({
        method: 'GET',
        url: `/office/retrieveAll?nameOffice=${nameOffice}`
      })
    }),
    readAvailableDatesForService: builder.mutation<Date[], { serviceId: number }>({
      query: ({ serviceId }) => ({
        method: 'GET',
        url: `/appointment/readAvailableDatesForService?serviceId=${serviceId}`
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
      query: ({ userId }) => ({
        method: 'GET',
        url: `/appointment/getAppointmentsByUserId?userId=${userId}`
      })
    }),
    getAppointmentsByDoctorId: builder.mutation<AppointmentState[], { userId: number }>({
      query: ({ userId }) => ({
        method: 'GET',
        url: `/appointment/getAppointmentsByDoctorId?userId=${userId}`
      })
    }),
    moveAppointment: builder.mutation<number, { appointmentId: number; date: Date }>({
      query: (data) => ({
        method: 'PUT',
        url: '/appointment/moveAppointment',
        body: data
      })
    }),
    deleteAppointment: builder.mutation<number, { appointmentId: number }>({
      query: (data) => ({
        method: 'DELETE',
        url: '/appointment/delete',
        body: data
      })
    }),
    updateUser: builder.mutation<number, RegisterState>({
      query: (data) => ({
        method: 'PUT',
        url: '/user/update',
        body: data
      })
    }),
    getAllDaysOffRetrieveByUserId: builder.mutation<DayOffState[], { userId: number }>({
      query: ({ userId }) => ({
        method: 'GET',
        url: `/dayOff/retrieveByUserId?userId=${userId}`
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
        method: 'PUT',
        url: '/dayOff/update',
        body: data
      })
    }),
    deleteDayOff: builder.mutation<number, { dayOffId: number }>({
      query: (data) => ({
        method: 'DELETE',
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
