import { SafeAreaView, View } from 'react-native';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useAppSelector } from '~/redux/hooks';
import { Button, HelperText } from 'react-native-paper';

// import {Nexmo} from 'nexmo';
import { checkVerification, sendSmsVerification } from '~/utils/sendVerifySMS';
import { useCallback, useState } from 'react';
import { COLOR } from '~/styles/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import ErrorChip from '~/components/ErrorChip';
import RegisterLogo from '~/assets/registerLogo.svg';
import { Text } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { styles } from '~/screens/Register/VeryficationPhone/styles';
import { useFocusEffect } from '@react-navigation/native';

export interface VerifySchema {
  code: string;
}

const VerifyStep = ({ navigation }: NavigationProps<Routes.VerifyStep>) => {
  const stored = useAppSelector((state) => state.register);
  const [resError, setResError] = useState('');
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value: value, cellCount: 6 });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });
  // sendSmsVerification(stored.phone).then();

  const insets = useSafeAreaInsets();

  const onSubmit = async ({ code }: VerifySchema) => {
    console.log('code', code);
    const result = await checkVerification(stored.phone, code);
    if (result) {
      navigation.navigate(Routes.Register);
    } else {
      setResError('Kod weryfikacyjny jest niepoprawny');
    }
  };

  const sendCodeHandler = useCallback(() => {
    sendSmsVerification(stored.phone).then((result) => {
      if (!result) {
        setResError('Nie udało się wysłać kodu weryfikacyjnego');
      }
    });
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
    const result = await sendSmsVerification(stored.phone);
    if (!result) {
      setResError('Nie udało się wysłać kodu weryfikacyjnego');
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
          <Controller
            name={'code'}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Te pole jest wymagane'
              },
              pattern: {
                value: /^[0-9]{6}$/,
                message: 'Niepoprawny kod weryfikacyjny'
              }
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={(text) => {
                  onChange(text);
                }}
                cellCount={6}
                onBlur={onBlur}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
            )}
          />
          <HelperText
            type="error"
            visible={!!errors}
            style={{ fontSize: 12, marginTop: -6, textAlign: 'center' }}>
            {errors.code?.message}
          </HelperText>
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
        </View>

        {resError && (
          <View style={{ width: 300, alignSelf: 'center' }}>
            <ErrorChip onClose={() => setResError('')} errorMsg={resError} />
          </View>
        )}

        <Button
          textColor={COLOR.WHITE}
          buttonColor={COLOR.PRIMARY}
          style={{ width: 200, alignSelf: 'center', marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}>
          Zatwierdź
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
