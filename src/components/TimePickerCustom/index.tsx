import { Control, Controller } from 'react-hook-form';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HelperText } from 'react-native-paper';
import { View } from 'react-native-ui-lib';
import React from 'react';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  normalTime?: boolean;
  setTimeFrom?: React.Dispatch<React.SetStateAction<Date>>;
  refTimeFrom?: Date;
}

const TimePickerCustom = ({
  control,
  name,
  error,
  normalTime,
  setTimeFrom,
  refTimeFrom
}: CustomTextInputProps) => {
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
              setTimeFrom && setTimeFrom(selectedDate || value);
            }}
            display={'default'}
            value={value}
            mode={'time'}
            timeZoneOffsetInMinutes={0}
            maximumDate={!normalTime ? new Date(0, 0, 0, 4, 0) : undefined}
            {...(refTimeFrom && { minimumDate: refTimeFrom })}
            minuteInterval={15}
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

export default TimePickerCustom;
