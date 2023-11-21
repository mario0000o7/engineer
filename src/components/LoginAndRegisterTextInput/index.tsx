import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { COLOR } from '~/styles/constants';
import { TextField } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';

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
            message: 'Te pole jest wymagane'
          },
          pattern:
            textContentType === 'emailAddress'
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Niepoprawny adres email'
                }
              : undefined
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholderTextColor={COLOR.LIGHT_GREY}
            label={label}
            placeholder={placeholder}
            secureTextEntry={hidePass}
            textContentType={textContentType}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            enableErrors={true}
            validateOnChange={true}
            floatingPlaceholder={true}
            validationMessage={[error!]}
            maxLength={20}
            showCharCounter={true}
            scrollEnabled={false}
            trailingAccessory={
              textContentType === 'password' ? (
                <MaterialIcons name="visibility" size={24} color="black" />
              ) : undefined
            }
            fieldStyle={{ borderBottomWidth: 1, borderBottomColor: COLOR.BLACK }}
          />
        )}
      />
    </View>
  );
};

export default CustomTextInput;
