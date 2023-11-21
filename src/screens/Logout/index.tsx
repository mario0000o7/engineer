import { View } from 'react-native';
import { useCallback } from 'react';
import { logOut } from '~/redux/slices/sessionSlice';
import { useAppDispatch } from '~/redux/hooks';
import { useFocusEffect } from '@react-navigation/native';

const LogoutScreen = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = useCallback(() => {
    console.log('logout');
    dispatch(logOut());
  }, []);

  useFocusEffect(logoutHandler);
  return <View></View>;
};

export default LogoutScreen;
