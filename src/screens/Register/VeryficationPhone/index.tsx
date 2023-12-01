import { SafeAreaView, View } from 'react-native';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { Button } from 'react-native-paper';

// import {Nexmo} from 'nexmo';
import { useCallback, useState } from 'react';
import { COLOR } from '~/styles/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import ErrorChip from '~/components/ErrorChip';
import RegisterLogo from '~/assets/registerLogo.svg';
import { Text } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OPTCodeInput from '~/components/OPTCodeInput';
import { checkVerificationRedux, clearError, sendVerificationRedux } from '~/redux/api/twilio';
import { useFocusEffect } from '@react-navigation/native';

export interface VerifySchema {
  code: string;
}

const VerifyStep = ({ navigation }: NavigationProps<Routes.VerifyStep>) => {
  const stored = useAppSelector((state) => state.register);
  const [timer, setTimer] = useState(0);
  const twilio = useAppSelector((state) => state.twilio);
  const dispatch = useAppDispatch();

  const insets = useSafeAreaInsets();

  const onSubmit = async ({ code }: VerifySchema) => {
    await dispatch(checkVerificationRedux(stored.phone, code));
    console.log(twilio.error);
    navigation.navigate(Routes.BirthStep);
  };

  const sendCodeHandler = useCallback(() => {
    dispatch(sendVerificationRedux(stored.phone)).then();
  }, [stored.phone]);

  useFocusEffect(sendCodeHandler);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<VerifySchema>({
    mode: 'onChange',
    defaultValues: {
      code: ''
    }
  });

  const onSendCode = async () => {
    // const result = sendSmsVerification(stored.phone);
    dispatch(sendVerificationRedux(stored.phone)).then();
    for (let i = 10; i >= 0; i--) {
      setTimer(i);
      console.log(i);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  };

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
            fontSize: 40,
            fontFamily: 'Poppins_600SemiBold'
          }}>
          Weryfikacja
        </Text>
        <RegisterLogo height={300} />

        <View style={{ alignSelf: 'center', width: 300 }}>
          <Text style={{ alignSelf: 'center', textAlign: 'left' }}>
            Wprowadź kod weryfikacyjny, który otrzymałeś na swój numer telefonu
          </Text>
          <OPTCodeInput name={'code'} control={control} error={errors.code?.message} />
          {timer == 0 ? (
            <Text style={{ alignSelf: 'center', textAlign: 'left' }}>
              Nie otrzymałeś kodu?{' '}
              <Text
                onPress={() => {
                  onSendCode().then();
                }}
                style={{ color: COLOR.PRIMARY }}>
                Wyślij ponownie
              </Text>
            </Text>
          ) : (
            <Text style={{ alignSelf: 'center', textAlign: 'left' }}>{timer}</Text>
          )}
        </View>

        {twilio.error && (
          <View style={{ width: 300, alignSelf: 'center' }}>
            <ErrorChip
              onClose={() => {
                dispatch(clearError());
              }}
              errorMsg={twilio.error!}
            />
          </View>
        )}

        <Button
          textColor={COLOR.WHITE}
          buttonColor={COLOR.PRIMARY}
          loading={twilio.loading}
          style={{ width: 200, alignSelf: 'center', marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}>
          Kontynuuj
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

export default VerifyStep;
