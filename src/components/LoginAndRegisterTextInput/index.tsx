import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { HelperText, TextInput } from 'react-native-paper';
import { COLOR } from '~/styles/constants';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  placeholder?: string;
  textContentType?: 'emailAddress' | 'password';
  label?: string;
}

const CustomTextInput = ({
  control,
  name,
  error,
  placeholder,
  textContentType,
  label
}: CustomTextInputProps) => {
  const [hidePass, setHidePass] = useState(textContentType === 'password');

  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'This field is required'
          },
          pattern:
            textContentType === 'emailAddress'
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              : undefined
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            placeholderTextColor={COLOR.LIGHT_GREY}
            label={label}
            outlineColor="#E2E2E2"
            placeholder={placeholder}
            secureTextEntry={hidePass}
            outlineStyle={{
              borderRadius: 50
            }}
            textContentType={textContentType}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            right={
              textContentType === 'password' && (
                <TextInput.Icon icon={'eye'} onPress={() => setHidePass((prev) => !prev)} />
              )
            }
            error={!!error}
          />
        )}
      />
      <HelperText type="error" visible={!!error} style={{ fontSize: 10, marginTop: -6 }}>
        {error}
      </HelperText>
    </View>
  );
};

export default CustomTextInput;
