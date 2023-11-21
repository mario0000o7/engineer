import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch } from '~/redux/hooks';
import { useLoginMutation } from '~/redux/api/authApi';
import { setToken } from '~/redux/slices/sessionSlice';
import CustomTextInput from '~/components/LoginAndRegisterTextInput';
import ErrorChip from '~/components/ErrorChip';
import { Platform } from 'react-native';
import { Button, KeyboardAwareScrollView, Text } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import LoginImage from '~/assets/PrivacyPolicy-rafiki.svg';

export interface LoginSchema {
  password: string;
  email: string;
}

const LoginScreen = () => {
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
    <SafeAreaProvider style={{ paddingTop: insets.top, paddingBottom: insets.bottom, flex: 1 }}>
      <KeyboardAwareScrollView
        showsHorizontalScrollIndicator={false}
        scrollEnabled={Platform.OS === 'ios'}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        style={{
          paddingLeft: 20,
          paddingRight: 20
        }}>
        <LoginImage width={20} height={20} fill={'black'} />
        <Text style={{ alignSelf: 'center' }} text60>
          Logowanie
        </Text>
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

        <Button
          style={{ width: 200, alignSelf: 'center', marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
          label="Zaloguj sie"
          backgroundColor={COLOR.PRIMARY}
          loading={isLoading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default LoginScreen;
