import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useCheckEmailMutation, useCheckPhoneMutation } from '~/redux/api/authApi';
import CustomTextInput from '~/components/LoginAndRegisterTextInput';
import ErrorChip from '~/components/ErrorChip';
import { Text, View } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Button } from 'react-native-paper';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import {
  setEmail,
  setFirstName,
  setLastName,
  setPhone,
  setPhoneCode,
  setRole,
  setTitle
} from '~/redux/slices/registerSlice';
import RegisterLogo from '~/assets/registerLogo.svg';
import PhoneCode from '~/components/phoneCode';

// ignore app already initialized error in snack
export interface RegisterSchema {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: number;
  phoneCode: string;
}

const EmailStep = ({ navigation, route }: NavigationProps<Routes.EmailStep>) => {
  const dispatch = useAppDispatch();
  const [checkEmail, { isLoading }] = useCheckEmailMutation();
  const [checkPhone, { isLoading: isLoadingPhoneNumber }] = useCheckPhoneMutation();
  const [resError, setResError] = useState('');
  const insets = useSafeAreaInsets();
  const stored = useAppSelector((state) => state.register);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterSchema>({
    mode: 'onChange',
    defaultValues: {
      email: stored.email,
      firstName: stored.firstName,
      lastName: stored.lastName,
      phone: stored.phone,
      role: stored.role,
      phoneCode: '+48'
    }
  });

  const onSubmit = async ({ email, phone, firstName, lastName, phoneCode }: RegisterSchema) => {
    let isEmailChecked = false;
    let isPhoneChecked = false;
    await checkEmail({ email })
      .unwrap()
      .then(({ userExists }) => {
        if (userExists) {
          setResError(() => 'This email has already an account');
        } else {
          isEmailChecked = true;
          dispatch(setEmail(email));
          dispatch(setRole(route.params.role));
          dispatch(setTitle(route.params.title));
        }
      })
      .catch((err) => {
        console.log(err);
        setResError('Niepoprawny adres email');
      });
    await checkPhone({ phone })
      .unwrap()
      .then(({ userExists }) => {
        if (userExists) {
          setResError(() => 'Ten numer telefonu jest już przypisany do konta');
        } else {
          isPhoneChecked = true;
          dispatch(setPhone(phone));
          dispatch(setPhoneCode(phoneCode));
        }
      })
      .catch((err) => {
        console.log(err);
        setResError('Niepoprawny numer telefonu');
      });
    if (isEmailChecked && isPhoneChecked) {
      dispatch(setFirstName(firstName));
      dispatch(setLastName(lastName));
      navigation.navigate(route.params.role == 2 ? Routes.VerifyStep : Routes.RegisterDoctor);
    }
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
          Rejestracja
        </Text>
        <RegisterLogo height={150} />
        <View style={{ width: 300, alignSelf: 'center' }}>
          <CustomTextInput
            name={'firstName'}
            control={control}
            error={errors.firstName?.message}
            placeholder={'Imię'}
            textContentType={'givenName'}
            label={'fistName'}
            keyboardType={'default'}
          />
          <CustomTextInput
            name={'lastName'}
            control={control}
            error={errors.lastName?.message}
            placeholder={'Nazwisko'}
            textContentType={'familyName'}
            label={'lastName'}
            keyboardType={'default'}
          />
          <CustomTextInput
            name={'email'}
            control={control}
            error={errors.email?.message}
            placeholder={'Adres email'}
            textContentType={'emailAddress'}
            label={'Email'}
            keyboardType={'email-address'}
          />
          <View row={true} style={{ width: 300 }}>
            <PhoneCode name={'phoneCode'} control={control} />
            <View style={{ width: 200 }}>
              <CustomTextInput
                maxLength={9}
                name={'phone'}
                control={control}
                error={errors.phone?.message}
                placeholder={'Numer telefonu'}
                textContentType={'telephoneNumber'}
                label={'phone'}
                keyboardType={'phone-pad'}
              />
            </View>
          </View>
          {resError && <ErrorChip onClose={() => setResError('')} errorMsg={resError} />}
        </View>

        <Button
          style={{ width: 300, alignSelf: 'center', marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
          buttonColor={COLOR.PRIMARY}
          textColor={COLOR.WHITE}
          loading={isLoading || isLoadingPhoneNumber}>
          Kontynuuj
        </Button>
        <View style={{ alignSelf: 'center', paddingTop: 5, flexDirection: 'row' }}>
          <View style={{ paddingRight: 10 }}>
            <Text>Posiadasz konto?</Text>
            <Text
              onPress={() => navigation.navigate(Routes.Login)}
              style={{ color: COLOR.PRIMARY, textAlign: 'center' }}>
              Zaloguj się
            </Text>
          </View>
          <View style={{ paddingLeft: 10 }}>
            <Text>{route.params.role == 2 ? 'Jesteś usługodawcą?' : 'Jesteś klientem?'}</Text>
            <Text
              onPress={() =>
                navigation.navigate(Routes.EmailStep, {
                  role: route.params.role == 2 ? 1 : 2,
                  title: route.params.role == 2 ? '' : 'Pacjent'
                })
              }
              style={{ color: COLOR.PRIMARY, textAlign: 'center' }}>
              Kliknij tutaj
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default EmailStep;
