import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { COLOR } from '~/styles/constants';
import { TextField, TouchableOpacity } from 'react-native-ui-lib';
import { MaterialIcons } from '@expo/vector-icons';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  placeholder?: string;
  textContentType?: 'emailAddress' | 'password' | 'telephoneNumber' | 'familyName' | 'givenName';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  label?: string;
}

const CustomTextInput = ({
  control,
  name,
  error,
  placeholder,
  textContentType,
  keyboardType,
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
            padding={true}
            enableErrors={true}
            validateOnChange={true}
            floatingPlaceholder={true}
            validationMessage={[error!]}
            maxLength={40}
            showCharCounter={true}
            scrollEnabled={false}
            autoCorrect={false}
            autoComplete={'off'}
            keyboardType={keyboardType}
            trailingAccessory={
              textContentType === 'password' ? (
                <TouchableOpacity
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}>
                  <MaterialIcons name="visibility" size={24} color="black" />
                </TouchableOpacity>
              ) : undefined
            }
            fieldStyle={{ borderBottomWidth: 2, borderBottomColor: COLOR.BLACK }}
          />
        )}
      />
    </View>
  );
};

export default CustomTextInput;
