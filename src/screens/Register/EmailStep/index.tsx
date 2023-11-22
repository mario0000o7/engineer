import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useCheckEmailMutation, useCheckPhoneMutation } from '~/redux/api/authApi';
import CustomTextInput from '~/components/LoginAndRegisterTextInput';
import ErrorChip from '~/components/ErrorChip';
import { Text } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { setEmail, setFirstName, setLastName, setPhone } from '~/redux/slices/registerSlice';
import RegisterLogo from '~/assets/registerLogo.svg';

// ignore app already initialized error in snack
export interface RegisterSchema {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: number;
}

const EmailStep = ({ navigation }: NavigationProps<Routes.EmailStep>) => {
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
      role: stored.role
    }
  });

  const onSubmit = async ({ email, phone, firstName, lastName }: RegisterSchema) => {
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
        }
      })
      .catch((err) => {
        console.log(err);
        setResError('Incorrect email or password');
      });
    await checkPhone({ phone })
      .unwrap()
      .then(({ userExists }) => {
        if (userExists) {
          setResError(() => 'This phone number has already an account');
        } else {
          isPhoneChecked = true;
          dispatch(setPhone(phone));
        }
      })
      .catch((err) => {
        console.log(err);
        setResError('Incorrect phone number');
      });
    if (isEmailChecked && isPhoneChecked) {
      dispatch(setFirstName(firstName));
      dispatch(setLastName(lastName));
      navigation.navigate(Routes.VerifyStep);
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
        <RegisterLogo height={300} />
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
          <CustomTextInput
            name={'phone'}
            control={control}
            error={errors.phone?.message}
            placeholder={'Numer telefonu'}
            textContentType={'telephoneNumber'}
            label={'phone'}
            keyboardType={'phone-pad'}
          />
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
            <Text>Jesteś usługodawcą?</Text>
            <Text
              onPress={() => navigation.navigate(Routes.Login)}
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
