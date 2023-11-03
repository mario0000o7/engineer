/* eslint-disable no-unused-vars */

import { NativeStackScreenProps } from '@react-navigation/native-stack';

export enum Routes {
  Calendar = 'Calendar',
  Settings = 'Settings',
  Profile = 'Profile',
  Login = 'Login',
  Register = 'Register',
  Chat = 'Chat',
  Files = 'Files',
  RecentMessages = 'RecentMessages',
  DoctorList = 'DoctorList'
}

export type RootStackParamList = {
  [Routes.Calendar]: undefined;
  [Routes.Settings]: undefined;
  [Routes.Profile]: undefined;
  [Routes.Login]: undefined;
  [Routes.Register]: undefined;
  [Routes.Chat]: undefined;
  [Routes.Files]: undefined;
  [Routes.RecentMessages]: undefined;
  [Routes.DoctorList]: undefined;
};

export type NavigationProps<T extends Routes> = NativeStackScreenProps<RootStackParamList, T>;
