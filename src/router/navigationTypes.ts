/* eslint-disable no-unused-vars */

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CustomFile } from '~/types/CustomMessage';

export enum Routes {
  MainNavigation = 'MainNavigation',
  Calendar = 'Calendar',
  Settings = 'Settings',
  Profile = 'Profile',
  Login = 'Login',
  Register = 'Register',
  Chat = 'Chat',
  Files = 'Files',
  RecentMessages = 'RecentMessages',
  ContactListNavigatorRecent = 'ContactListNavigatorRecent',
  ContactListNavigatorStable = 'ContactListNavigatorStable',
  ContactListAll = 'ContactListAll',
  ContactListRecent = 'ContactListRecent',
  DoctorList = 'DoctorList',
  ChatNavigation = 'ChatNavigation',
  LoginNavigation = 'LoginNavigation',
  Logout = 'Logout',
  EmailStep = 'EmailStep',
  PasswordStep = 'PasswordStep',
  VerifyStep = 'VerifyStep',
  BirthStep = 'BirthStep',
  Message = 'Message',
  ContactItem = 'ContactItem',
  PDFViewer = 'PDFViewer',
  RegisterDoctor = 'RegisterDoctor'
}

export type RootStackParamList = {
  [Routes.MainNavigation]: undefined;
  [Routes.Calendar]: undefined;
  [Routes.Settings]: undefined;
  [Routes.Profile]: undefined;
  [Routes.Login]: undefined;
  [Routes.Register]: undefined;
  [Routes.Chat]: undefined;
  [Routes.Files]: undefined;
  [Routes.RecentMessages]: undefined;
  [Routes.DoctorList]: undefined;
  [Routes.Message]: { name: string; id: number };
  [Routes.ChatNavigation]: undefined;
  [Routes.LoginNavigation]: undefined;
  [Routes.Logout]: undefined;
  [Routes.EmailStep]: { role: number; title: string };
  [Routes.PasswordStep]: undefined;
  [Routes.VerifyStep]: undefined;
  [Routes.BirthStep]: undefined;
  [Routes.ContactListNavigatorRecent]: undefined;
  [Routes.ContactListNavigatorStable]: undefined;
  [Routes.ContactListAll]: undefined;
  [Routes.ContactItem]: undefined;
  [Routes.RegisterDoctor]: undefined;
  [Routes.PDFViewer]: { file: CustomFile };
  [Routes.ContactListRecent]: undefined;
};

export type NavigationProps<T extends Routes> = NativeStackScreenProps<RootStackParamList, T>;
