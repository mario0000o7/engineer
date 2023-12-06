import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, View } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '~/components/LoginAndRegisterTextInput';
import ErrorChip from '~/components/ErrorChip';
import { Button } from 'react-native-paper';
import { COLOR } from '~/styles/constants';
import { useAppDispatch } from '~/redux/hooks';
import { useState } from 'react';
import Location from '~/assets/location.svg';
import SelectCountry from '~/components/SelectCountry';
import {
  setAddress1,
  setAddress2,
  setCity,
  setCountry,
  setPostalCode,
  setTitle
} from '~/redux/slices/registerSlice';

export interface RegisterDoctorSchema {
  title: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  postalCode: string;
}

const RegisterDoctor = ({ navigation }: NavigationProps<Routes.RegisterDoctor>) => {
  const insets = useSafeAreaInsets();
  const [resError, setResError] = useState('');
  const dispatch = useAppDispatch();

  const onSubmit = async ({
    title,
    address1,
    address2,
    city,
    country,
    postalCode
  }: RegisterDoctorSchema) => {
    dispatch(setTitle(title));
    dispatch(setAddress1(address1));
    dispatch(setAddress2(address2!));
    dispatch(setCity(city));
    dispatch(setCountry(country));
    dispatch(setPostalCode(postalCode));
    navigation.navigate(Routes.VerifyStep);
  };

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterDoctorSchema>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      postalCode: ''
    }
  });
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
        <Location height={100} />
        {/*<RegisterLogo height={300} />*/}
        <View style={{ width: 300, alignSelf: 'center' }}>
          <CustomTextInput
            name={'title'}
            control={control}
            error={errors.title?.message}
            placeholder={'Tytuł'}
            textContentType={'jobTitle'}
            label={'title'}
            keyboardType={'default'}
          />
          <CustomTextInput
            name={'address1'}
            control={control}
            error={errors.address1?.message}
            placeholder={'Adres zamieszkania 1'}
            textContentType={'streetAddressLine1'}
            label={'address1'}
            keyboardType={'default'}
          />
          <CustomTextInput
            name={'address2'}
            control={control}
            error={errors.address2?.message}
            placeholder={'Adres zamieszkania 2 (opcjonalnie)'}
            textContentType={'streetAddressLine2'}
            label={'address2'}
            keyboardType={'default'}
          />
          <CustomTextInput
            name={'city'}
            control={control}
            error={errors.city?.message}
            placeholder={'Miasto'}
            textContentType={'addressCity'}
            label={'city'}
            keyboardType={'default'}
          />
          <CustomTextInput
            name={'postalCode'}
            control={control}
            error={errors.postalCode?.message}
            placeholder={'Kod pocztowy'}
            textContentType={'postalCode'}
            label={'postalCode'}
            keyboardType={'default'}
          />
          <SelectCountry name={'country'} control={control} error={errors.country?.message} />
          {resError && <ErrorChip onClose={() => setResError('')} errorMsg={resError} />}
        </View>

        <Button
          textColor={COLOR.WHITE}
          buttonColor={COLOR.PRIMARY}
          // loading={isLoading}
          style={{ width: 200, alignSelf: 'center', marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}>
          Kontynuuj
        </Button>
        <View style={{ alignSelf: 'center' }}>
          <Text>Posiadasz konto?</Text>
          <Text
            onPress={() => navigation.navigate(Routes.Login)}
            style={{ color: COLOR.PRIMARY, textAlign: 'center' }}>
            Zaloguj się
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaProvider>
  );
};

export default RegisterDoctor;
