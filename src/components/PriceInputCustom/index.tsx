import { Control, Controller } from 'react-hook-form';
import { HelperText } from 'react-native-paper';
import { NumberInput, View } from 'react-native-ui-lib';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
}

const PriceInputCustom = ({ control, name, error }: CustomTextInputProps) => {
  return (
    <View>
      <Controller
        name={name}
        control={control}
        rules={{
          required: {
            value: true,
            message: 'Te pole jest wymagane'
          }
        }}
        render={({ field: { onChange, value } }) => (
          <NumberInput onChangeNumber={onChange} initialNumber={value} trailingText={'zł'} />
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

export default PriceInputCustom;
