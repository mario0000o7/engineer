import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { HelperText } from 'react-native-paper';
import React from 'react';

interface CustomTextInputProps {
  name: string;
  control: Control<any>;
  error?: string;
  isUnMaxDate?: boolean;
  isMinDate?: boolean;
  refDate?: Date;
  setRefDate?: React.Dispatch<React.SetStateAction<Date>>;
}

const DateInputCustom = ({
  control,
  name,
  error,
  isUnMaxDate,
  isMinDate,
  refDate,
  setRefDate
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
              if (refDate && selectedDate! > refDate) {
                onChange(refDate);
                return;
              }
              onChange(selectedDate || value);
              if (setRefDate) setRefDate(selectedDate || value);
            }}
            display={'default'}
            locale={'pl'}
            value={value}
            {...(refDate
              ? { minimumDate: refDate }
              : { minimumDate: isMinDate ? new Date() : undefined })}
            maximumDate={isUnMaxDate ? undefined : new Date()}
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
