import { SafeAreaView } from 'react-native';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { Button } from 'react-native-paper';
import { useState } from 'react';
import { COLOR } from '~/styles/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import ErrorChip from '~/components/ErrorChip';
import RegisterLogo from '~/assets/registerLogo.svg';
import { Text, View } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setBirthDate, setGender, setPassword } from '~/redux/slices/registerSlice';
import DateInputCustom from '~/components/DateInputCustom';
import GenderSelectCustom from '~/components/GenderSelectCustom';
import LoginAndRegisterTextInput from '~/components/LoginAndRegisterTextInput';
import { useRegisterMutation } from '~/redux/api/authApi';
import { JwtProps, setToken } from '~/redux/slices/sessionSlice';
import createUser from '~/utils/createUser';
import { jwtDecode } from 'jwt-decode';

export interface VerifySchema {
  birthDate: Date;
  gender: string;
  password: string;
  repeatPassword: string;
}

const BirthStep = ({ navigation }: NavigationProps<Routes.BirthStep>) => {
  const stored = useAppSelector((state) => state.register);
  const [resError, setResError] = useState('');
  const dispatch = useAppDispatch();
  const [register, { isLoading }] = useRegisterMutation();
  const registerState = useAppSelector((state) => state.register);

  const insets = useSafeAreaInsets();

  const onSubmit = async ({ birthDate, gender, password, repeatPassword }: VerifySchema) => {
    if (password !== repeatPassword) {
      setResError('Hasła nie są takie same');
      return;
    }
    dispatch(setBirthDate(birthDate));
    dispatch(setGender(gender));
    dispatch(setPassword(password));
    register({ ...registerState, password: password, gender: gender, birthDate: birthDate })
      .unwrap()
      .then(({ token }) => {
        const decoded = jwtDecode(token ?? '') as JwtProps;
        createUser(decoded!.id.toString(), decoded.email!);
        dispatch(setToken(token));
      })
      .catch((err) => {
        console.log(err);
        setResError('Coś poszło nie tak');
      });
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<VerifySchema>({
    mode: 'onChange',
    defaultValues: {
      birthDate: stored.birthDate,
      gender: stored.gender,
      password: stored.password,
      repeatPassword: ''
    }
  });

  return (
    <SafeAreaView
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
            fontSize: 35,
            fontFamily: 'Poppins_600SemiBold'
          }}>
          Kończenie rejestracji
        </Text>
        <RegisterLogo height={300} />

        <View style={{ alignSelf: 'center', width: 300 }}>
          <Text style={{ alignSelf: 'center', textAlign: 'left' }}>
            Wprowadź datę urodzenia oraz płeć i hasło
          </Text>
          <View row centerV centerH>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16 }}>Data urodzenia</Text>
            <DateInputCustom name={'birthDate'} control={control} />
          </View>
          <GenderSelectCustom name={'gender'} control={control} error={errors.gender?.message} />
          <LoginAndRegisterTextInput
            name={'password'}
            control={control}
            error={errors.password?.message}
            placeholder={'Hasło'}
            textContentType={'password'}
          />
          <LoginAndRegisterTextInput
            name={'repeatPassword'}
            control={control}
            placeholder={'Powtórz hasło'}
            textContentType={'password'}
            error={errors.repeatPassword?.message}
          />
        </View>

        {resError && (
          <View style={{ width: 300, alignSelf: 'center' }}>
            <ErrorChip onClose={() => setResError('')} errorMsg={resError} />
          </View>
        )}

        <Button
          textColor={COLOR.WHITE}
          buttonColor={COLOR.PRIMARY}
          loading={isLoading}
          style={{ width: 200, alignSelf: 'center', marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}>
          Utwórz konto
        </Button>
        <View style={{ alignSelf: 'center' }}>
          <Text s>Posiadasz konto?</Text>
          <Text
            onPress={() => navigation.navigate(Routes.Login)}
            style={{ color: COLOR.PRIMARY, textAlign: 'center' }}>
            Zaloguj się
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default BirthStep;
