import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList, Routes } from '~/router/navigationTypes';
import LoginScreen from '~/screens/Login';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import MyDrawer from '~/router/MyDrawer';
import { preloadToken } from '~/redux/slices/sessionSlice';
import { useEffect } from 'react';
import EmailStep from '~/screens/Register/EmailStep';
import VerifyStep from '~/screens/Register/VeryficationPhone';

const RegisterNavigation = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  const isSignedIn = !!useAppSelector((state) => state.session.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(preloadToken());
  }, []);

  return (
    <Stack.Navigator initialRouteName={Routes.Login}>
      {isSignedIn ? (
        <>
          <Stack.Screen
            name={Routes.MainNavigation}
            component={MyDrawer}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name={Routes.Login}
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={Routes.EmailStep}
            component={EmailStep}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name={Routes.VerifyStep}
            component={VerifyStep}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RegisterNavigation;
