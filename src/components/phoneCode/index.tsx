import { COLOR } from '~/styles/constants';
import country from '~/types/country';
import { Picker, View } from 'react-native-ui-lib';
import { Control, Controller } from 'react-hook-form';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  unRequired?: boolean;
}

const phoneCode = ({ control, name, error, unRequired }: CustomTextInputProps) => {
  return (
    <View style={{ width: 'auto', maxWidth: 100 }}>
      <Controller
        name={name}
        control={control}
        rules={{
          required: !unRequired && {
            value: true,
            message: 'Te pole jest wymagane'
          }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Picker
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            color={COLOR.PRIMARY}
            showSearch={true}
            fieldStyle={{
              borderWidth: 5,
              borderRadius: 50,
              borderColor: COLOR.PRIMARY,
              paddingHorizontal: 10,
              paddingVertical: 10
            }}
            useSafeArea={true}
            validationMessageStyle={{
              marginLeft: 10,
              display: error ? 'flex' : 'none'
            }}
            text90={true}
            defaultValue={'+48'}
            floatingPlaceholder={true}
            placeholderTextColor={COLOR.LIGHT_GREY}
            floatingPlaceholderColor={COLOR.PRIMARY}
            floatingPlaceholderStyle={{
              marginTop: value ? -17 : 0
            }}>
            {country.map((item) => (
              <Picker.Item key={item.iso} value={'+' + item.code} label={'+' + item.code} />
            ))}
          </Picker>
        )}
      />
    </View>
  );
};

export default phoneCode;
