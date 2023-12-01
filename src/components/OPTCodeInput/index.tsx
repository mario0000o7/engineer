import { Control, Controller } from 'react-hook-form';
import { Text, View } from 'react-native-ui-lib';
import { HelperText } from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell
} from 'react-native-confirmation-code-field';
import { styles } from '~/screens/Register/VeryficationPhone/styles';
import { useState } from 'react';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
}

const OPTCodeInput = ({ control, name, error }: CustomTextInputProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({ value: value, cellCount: 6 });

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  });
  return (
    <View>
      <Controller
        name={name}
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
      {error && (
        <HelperText
          type="error"
          visible={!!error}
          style={{ fontSize: 14, marginTop: -6, alignSelf: 'center' }}>
          {error}
        </HelperText>
      )}
    </View>
  );
};

export default OPTCodeInput;
