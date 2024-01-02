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
  textContentType?:
    | 'emailAddress'
    | 'password'
    | 'telephoneNumber'
    | 'familyName'
    | 'givenName'
    | 'oneTimeCode'
    | 'streetAddressLine1'
    | 'streetAddressLine2'
    | 'addressCity'
    | 'postalCode'
    | 'jobTitle'
    | 'countryName';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  maxLength?: number;
  label?: string;
  unRequired?: boolean;
}

const CustomTextInput = ({
  control,
  name,
  error,
  placeholder,
  textContentType,
  keyboardType,
  maxLength = 40,
  unRequired
}: CustomTextInputProps) => {
  const [hidePass, setHidePass] = useState(textContentType === 'password');

  return (
    <View
      style={{
        marginVertical: 0
      }}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: !unRequired && {
            value: textContentType !== 'streetAddressLine2',
            message: 'Te pole jest wymagane'
          },
          pattern:
            textContentType === 'emailAddress'
              ? {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Niepoprawny adres email'
                }
              : textContentType === 'telephoneNumber'
              ? {
                  value: /^[0-9 ]{9}$/i,
                  message: 'Niepoprawny numer telefonu'
                }
              : undefined
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholderTextColor={COLOR.LIGHT_GREY}
            placeholder={placeholder}
            floatingPlaceholderColor={COLOR.PRIMARY}
            secureTextEntry={hidePass}
            textContentType={textContentType}
            onBlur={onBlur}
            fieldStyle={{
              borderWidth: 5,
              borderColor: COLOR.PRIMARY,
              borderRadius: 50,
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
            floatingPlaceholderStyle={{
              marginTop: value ? -17 : 0
            }}
            textAlignVertical={'center'}
            onChangeText={onChange}
            value={value}
            enableErrors={true}
            validateOnChange={true}
            floatingPlaceholder={true}
            validationMessage={[error!]}
            maxLength={maxLength}
            showCharCounter={false}
            scrollEnabled={true}
            autoCorrect={false}
            autoComplete={'off'}
            validationMessageStyle={{
              marginLeft: 10,
              display: error ? 'flex' : 'none'
            }}
            text90={true}
            keyboardType={keyboardType}
            trailingAccessory={
              textContentType === 'password' ? (
                <TouchableOpacity
                  style={{
                    display: value ? 'flex' : 'none'
                  }}
                  onPress={() => {
                    setHidePass(!hidePass);
                  }}>
                  <MaterialIcons name="visibility" size={24} color="black" />
                </TouchableOpacity>
              ) : undefined
            }
            // fieldStyle={{ borderBottomWidth: 2, borderBottomColor: COLOR.BLACK }}
          />
        )}
      />
    </View>
  );
};

export default CustomTextInput;
