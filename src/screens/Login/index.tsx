import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { useLoginMutation } from '~/redux/api/authApi';
import { setToken } from '~/redux/slices/sessionSlice';
import CustomTextInput from '~/components/LoginAndRegisterTextInput';
import ErrorChip from '~/components/ErrorChip';
import { Text } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import LoginImage from '~/assets/PrivacyPolicy-rafiki.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationProps, Routes } from '~/router/navigationTypes';

export interface LoginSchema {
  password: string;
  email: string;
}

const LoginScreen = ({ navigation }: NavigationProps<Routes.Login>) => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [resError, setResError] = useState('');
  const insets = useSafeAreaInsets();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginSchema>();

  const onSubmit = ({ email, password }: LoginSchema) => {
    login({ email, password })
      .unwrap()
      .then(({ token }) => {
        dispatch(setToken(token));
      })
      .catch((err) => {
        console.log(err);
        setResError('Incorrect email or password');
      });
  };

  return (
    <SafeAreaProvider
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom
      }}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        enableAutomaticScroll={true}>
        <Text
          style={{
            alignSelf: 'center',
            paddingTop: 40,
            fontSize: 40,
            fontFamily: 'Poppins_600SemiBold'
          }}>
          Logowanie
        </Text>
        <LoginImage height={400} />
        <View style={{ width: 300, alignSelf: 'center' }}>
          <CustomTextInput
            name={'email'}
            control={control}
            error={errors.email?.message}
            placeholder={'Adres email'}
            textContentType={'emailAddress'}
            label={'Email'}
          />
          <CustomTextInput
            name={'password'}
            control={control}
            error={errors.password?.message}
            placeholder={'Hasło'}
            textContentType={'password'}
            label={'Password'}
          />
          {resError && <ErrorChip onClose={() => setResError('')} errorMsg={resError} />}
        </View>

        <Button
          style={{ width: 200, alignSelf: 'center', marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
          buttonColor={COLOR.PRIMARY}
          textColor={COLOR.WHITE}
          loading={isLoading}>
          Zaloguj się
        </Button>
        <View style={{ alignSelf: 'center', paddingTop: 5 }}>
          <Text>Nie posiadasz konta?</Text>
          <Text
            onPress={() => navigation.navigate(Routes.EmailStep)}
            style={{ color: COLOR.PRIMARY, textAlign: 'center' }}>
            Zarejestruj się
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
