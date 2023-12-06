import { View } from 'react-native';
import { useCallback } from 'react';
import { logOut } from '~/redux/slices/sessionSlice';
import { useAppDispatch } from '~/redux/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { CometChat } from '@cometchat/chat-sdk-react-native';

const LogoutScreen = () => {
  const dispatch = useAppDispatch();

  const logoutHandler = useCallback(() => {
    CometChat.logout().then();
    dispatch(logOut());
  }, []);

  useFocusEffect(logoutHandler);
  return <View></View>;
};

export default LogoutScreen;
