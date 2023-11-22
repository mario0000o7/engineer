/* eslint-disable no-unused-vars */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

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
  DoctorList = 'DoctorList',
  Message = 'Message',
  ChatNavigation = 'ChatNavigation',
  LoginNavigation = 'LoginNavigation',
  Logout = 'Logout',
  EmailStep = 'EmailStep',
  PasswordStep = 'PasswordStep',
  VerifyStep = 'VerifyStep'
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
  [Routes.EmailStep]: undefined;
  [Routes.PasswordStep]: undefined;
  [Routes.VerifyStep]: undefined;
};

export type NavigationProps<T extends Routes> = NativeStackScreenProps<RootStackParamList, T>;
