/* eslint-disable no-unused-vars */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomFile } from '~/types/CustomMessage';
import { OfficeState } from '~/types/office';
import { ServiceState } from '~/types/service';

export enum Routes {
  MainNavigation = 'MainNavigation',
  Calendar = 'Calendar',
  Settings = 'Settings',
  Profile = 'Profile',
  Login = 'Login',
  Register = 'Register',
  Chat = 'Chat',
  ContactListNavigatorRecent = 'ContactListNavigatorRecent',
  ContactListNavigatorStable = 'ContactListNavigatorStable',
  ContactListAll = 'ContactListAll',
  ContactListRecent = 'ContactListRecent',
  DoctorList = 'DoctorList',
  ChatNavigation = 'ChatNavigation',
  LoginNavigation = 'LoginNavigation',
  Logout = 'Logout',
  EmailStep = 'EmailStep',
  VerifyStep = 'VerifyStep',
  BirthStep = 'BirthStep',
  Message = 'Message',
  ContactItem = 'ContactItem',
  PDFViewer = 'PDFViewer',
  RegisterDoctor = 'RegisterDoctor',
  OfficeList = 'OfficeList',
  OfficeNavigator = 'OfficeNavigator',
  OfficeItem = 'OfficeItem',
  OfficeDetails = 'OfficeDetails',
  OfficeCalendar = 'OfficeCalendar',
  OfficeServiceList = 'OfficeServiceList',
  DaysOffList = 'DaysOffList'
}

export type RootStackParamList = {
  [Routes.MainNavigation]: undefined;
  [Routes.Calendar]: undefined;
  [Routes.Settings]: undefined;
  [Routes.Profile]: undefined;
  [Routes.Login]: undefined;
  [Routes.Register]: undefined;
  [Routes.Chat]: undefined;
  [Routes.DoctorList]: undefined;
  [Routes.Message]: { name: string; id: number };
  [Routes.ChatNavigation]: undefined;
  [Routes.LoginNavigation]: undefined;
  [Routes.Logout]: undefined;
  [Routes.EmailStep]: { role: number; title: string };
  [Routes.VerifyStep]: undefined;
  [Routes.BirthStep]: undefined;
  [Routes.ContactListNavigatorRecent]: undefined;
  [Routes.ContactListNavigatorStable]: undefined;
  [Routes.ContactListAll]: undefined;
  [Routes.ContactItem]: undefined;
  [Routes.RegisterDoctor]: undefined;
  [Routes.PDFViewer]: { file: CustomFile };
  [Routes.ContactListRecent]: undefined;
  [Routes.OfficeList]: undefined;
  [Routes.OfficeNavigator]: undefined;
  [Routes.OfficeItem]: undefined;
  [Routes.OfficeDetails]: { name: string; create?: boolean; office?: OfficeState };
  [Routes.OfficeCalendar]: {
    name: string;
    id: number;
    service: ServiceState;
    move?: boolean;
    appointmentId?: number;
  };
  [Routes.OfficeServiceList]: { name: string; id: number };
  [Routes.DaysOffList]: undefined;
};

export type NavigationProps<T extends Routes> = NativeStackScreenProps<RootStackParamList, T>;
