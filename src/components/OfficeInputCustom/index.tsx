import { Control, Controller } from 'react-hook-form';
import { TextField, View } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  placeholder?: string;
}

const OfficeInputCustom = ({ control, name, error, placeholder }: CustomTextInputProps) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: name !== 'address2',
            message: 'Te pole jest wymagane'
          }
        }}
        render={({ field: { onChange, value } }) => (
          <TextField
            fieldStyle={{ borderBottomWidth: 2 }}
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 15
            }}
            onChangeText={onChange}
            value={value}
            enableErrors={true}
            validateOnChange={true}
            validationMessage={[error!]}
            floatingPlaceholderColor={COLOR.PRIMARY}
            placeholder={placeholder}
            floatingPlaceholder={true}
          />
        )}
      />
    </View>
  );
};

export default OfficeInputCustom;
