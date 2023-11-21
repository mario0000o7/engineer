import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { useLoginMutation } from '~/redux/api/authApi';
import { setToken } from '~/redux/slices/sessionSlice';
import CustomTextInput from '~/components/LoginAndRegisterTextInput';
import { Button } from 'react-native-paper';
import ErrorChip from '~/components/ErrorChip';

export interface LoginSchema {
  password: string;
  email: string;
}

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const [resError, setResError] = useState('');

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
    <SafeAreaProvider>
      <CustomTextInput
        name={'email'}
        control={control}
        error={errors.email?.message}
        placeholder={'Email'}
        textContentType={'emailAddress'}
        label={'Email'}
      />
      <CustomTextInput
        name={'password'}
        control={control}
        error={errors.password?.message}
        placeholder={'Password'}
        textContentType={'password'}
        label={'Password'}
      />
      {resError && <ErrorChip onClose={() => setResError('')} errorMsg={resError} />}

      <Button onPress={handleSubmit(onSubmit)} mode="contained" loading={isLoading}>
        Login
      </Button>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
