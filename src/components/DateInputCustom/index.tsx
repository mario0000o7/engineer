import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HelperText } from 'react-native-paper';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
}

const DateInputCustom = ({ control, name, error }: CustomTextInputProps) => {
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
          <DateTimePicker
            onChange={(_, selectedDate) => {
              onChange(selectedDate || value);
            }}
            display={'default'}
            locale={'pl'}
            value={value}
            maximumDate={new Date()}
            style={{ alignSelf: 'center' }}
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

export default DateInputCustom;
