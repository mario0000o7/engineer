import { Control, Controller } from 'react-hook-form';
import { RadioButton, RadioGroup, View } from 'react-native-ui-lib';
import { HelperText } from 'react-native-paper';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
}

const GenderSelectCustom = ({ control, name, error }: CustomTextInputProps) => {
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
          <View>
            <RadioGroup initialValue={value} onValueChange={onChange}>
              <View row centerH marginT-5>
                <RadioButton marginH-5 value={'male'} label={'Mężczyzna'} />
                <RadioButton marginH-5 value={'female'} label={'Kobieta'} />
              </View>
            </RadioGroup>
            {error && (
              <HelperText
                type="error"
                visible={!!error}
                style={{ fontSize: 14, marginTop: -6, alignSelf: 'center' }}>
                {error}
              </HelperText>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default GenderSelectCustom;
