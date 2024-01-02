import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import CustomTextInput from '~/components/LoginAndRegisterTextInput';
import LoginAndRegisterTextInput from '~/components/LoginAndRegisterTextInput';
import SelectCountry from '~/components/SelectCountry';
import PhoneCode from '~/components/phoneCode';
import DateInputCustom from '~/components/DateInputCustom';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLOR } from '~/styles/constants';
import { useAppSelector } from '~/redux/hooks';
import { useGetUserByIdsMutation, useUpdateUserMutation } from '~/redux/api/authApi';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import GenderSelectCustom from '~/components/GenderSelectCustom';
import { RegisterState } from '~/redux/slices/registerSlice';

export interface SettingsProps {
  id?: number;
  password?: string;
  email?: string;
  phone?: string;
  role?: number;
  firstName?: string;
  lastName?: string;
  birthDate?: Date;
  gender?: string;
  title?: string;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  unReadMessages?: number;
  phoneCode?: string;
}

const Settings = ({ navigation }: NavigationProps<Routes.Settings>) => {
  const role = useAppSelector((state) => state.session.role);
  const id = useAppSelector((state) => state.session.id);
  const [getUserByIds, { isLoading }] = useGetUserByIdsMutation();
  const [updateUser, { isLoading: isLoadingUpdate }] = useUpdateUserMutation();
  const {
    control,
    handleSubmit,
    formState: { isDirty },
    resetField
  } = useForm<SettingsProps>({
    mode: 'onChange',
    defaultValues: {
      gender: '',
      firstName: '',
      lastName: '',
      email: '',
      password: undefined,
      birthDate: new Date(),
      postalCode: '',
      title: '',
      address1: '',
      address2: '',
      city: '',
      country: '',
      phone: '',
      phoneCode: ''
    }
  });

  const onSubmit = async (data: SettingsProps) => {
    if (data.password === '') {
      delete data.password;
    }
    data.id = id!;
    updateUser(data as RegisterState)
      .unwrap()
      .then((res) => {
        console.log(res);
        navigation.goBack();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const buttonsHandler = useCallback(() => {
    console.log(isDirty);
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 5 }}>
          {isLoading || isLoadingUpdate ? (
            <ActivityIndicator size={'large'} color={COLOR.PRIMARY} />
          ) : (
            isDirty && (
              <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <AntDesign name={'checkcircle'} size={35} color={COLOR.GREEN} />
                </TouchableOpacity>
              </View>
            )
          )}
        </View>
      )
    });
  }, [isDirty, isLoading]);

  useFocusEffect(buttonsHandler);

  const getUserHandler = useCallback(() => {
    getUserByIds({ ids: [id!] })
      .unwrap()
      .then((res) => {
        resetField('birthDate', {
          defaultValue: new Date(res[0].birthDate!),
          keepTouched: false,
          keepDirty: false
        });
        resetField('firstName', {
          defaultValue: res[0].firstName,
          keepTouched: false,
          keepDirty: false
        });
        resetField('lastName', {
          defaultValue: res[0].lastName,
          keepTouched: false,
          keepDirty: false
        });
        resetField('email', {
          defaultValue: res[0].email,
          keepTouched: false,
          keepDirty: false
        });
        resetField('postalCode', {
          defaultValue: res[0].postalCode,
          keepTouched: false,
          keepDirty: false
        });
        resetField('title', {
          defaultValue: res[0].title,
          keepTouched: false,
          keepDirty: false
        });
        resetField('address1', {
          defaultValue: res[0].address1,
          keepTouched: false,
          keepDirty: false
        });
        resetField('address2', {
          defaultValue: res[0].address2,
          keepTouched: false,
          keepDirty: false
        });
        resetField('city', {
          defaultValue: res[0].city,
          keepTouched: false,
          keepDirty: false
        });
        resetField('country', {
          defaultValue: res[0].country,
          keepTouched: false,
          keepDirty: false
        });
        resetField('phone', {
          defaultValue: res[0].phone,
          keepTouched: false,
          keepDirty: false
        });
        resetField('phoneCode', {
          defaultValue: res[0].phoneCode,
          keepTouched: false,
          keepDirty: false
        });
        resetField('gender', {
          keepDirty: false,
          keepTouched: false,
          defaultValue: res[0].gender
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useFocusEffect(getUserHandler);

  return (
    <View useSafeArea={true} flex={true}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, margin: 15 }}>
        <GenderSelectCustom name={'gender'} control={control} />

        <CustomTextInput
          name={'firstName'}
          control={control}
          placeholder={'Imię'}
          textContentType={'givenName'}
          keyboardType={'default'}
        />
        <CustomTextInput
          name={'lastName'}
          control={control}
          placeholder={'Nazwisko'}
          keyboardType={'default'}
          textContentType={'familyName'}
        />

        <CustomTextInput
          name={'email'}
          control={control}
          placeholder={'Adres email'}
          keyboardType={'email-address'}
          textContentType={'emailAddress'}
        />
        <LoginAndRegisterTextInput
          name={'password'}
          control={control}
          placeholder={'Hasło'}
          textContentType={'password'}
          unRequired={true}
        />
        <View
          row
          centerV
          style={{
            borderWidth: 5,
            borderColor: COLOR.PRIMARY,
            borderRadius: 50,
            marginTop: 20
          }}>
          <View
            style={{
              paddingHorizontal: 10
            }}>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 16 }}>Data urodzenia</Text>
          </View>
          <DateInputCustom name={'birthDate'} control={control} />
        </View>
        {role === 1 && (
          <CustomTextInput
            name={'title'}
            control={control}
            textContentType={'jobTitle'}
            placeholder={'Tytuł'}
            keyboardType={'default'}
          />
        )}
        <View row={true} style={{ width: 300 }}>
          <PhoneCode name={'phoneCode'} control={control} unRequired={true} />
          <View style={{ width: '100%' }}>
            <CustomTextInput
              maxLength={9}
              name={'phone'}
              control={control}
              placeholder={'Numer telefonu'}
              textContentType={'telephoneNumber'}
              label={'phone'}
              keyboardType={'phone-pad'}
            />
          </View>
        </View>
        <CustomTextInput
          name={'address1'}
          textContentType={'streetAddressLine1'}
          placeholder={'Adres zamieszkania 1'}
          control={control}
          keyboardType={'default'}
        />
        <CustomTextInput
          name={'address2'}
          control={control}
          placeholder={'Adres zamieszkania 2 (opcjonalnie)'}
          textContentType={'streetAddressLine2'}
          label={'address2'}
          keyboardType={'default'}
        />
        <CustomTextInput
          name={'city'}
          placeholder={'Miasto'}
          textContentType={'addressCity'}
          label={'city'}
          keyboardType={'default'}
          control={control}
        />
        <CustomTextInput
          name={'postalCode'}
          placeholder={'Kod pocztowy'}
          textContentType={'postalCode'}
          label={'postalCode'}
          keyboardType={'default'}
          control={control}
        />

        <SelectCountry name={'country'} control={control} />
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Settings;
