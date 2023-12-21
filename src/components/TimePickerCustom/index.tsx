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
  refTimeFrom?: Date;
  readonly?: boolean;
  service?: boolean;
  numberOfDay?: number;
  setDays?: React.Dispatch<React.SetStateAction<Date[]>>;
  days?: Date[];
}

const TimePickerCustom = ({
  control,
  name,
  error,
  normalTime,
  refTimeFrom,
  readonly,
  service,
  numberOfDay,
  setDays,
  days
}: CustomTextInputProps) => {
  const maxDate = new Date();
  maxDate.setHours(3);
  maxDate.setMinutes(0);
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
          pattern: {
            value: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
            message: 'Niepoprawny format godziny'
          }
        }}
        render={({ field: { onChange, value } }) => (
          <DateTimePicker
            onChange={(_, selectedDate) => {
              const currentDate = new Date();
              currentDate.setHours(selectedDate?.getHours()!);
              currentDate.setMinutes(selectedDate?.getMinutes()!);
              currentDate.setSeconds(0);
              onChange(currentDate);
              if (numberOfDay === undefined) return;
              const tmpDays = [...days!];
              tmpDays[numberOfDay!] = currentDate;
              setDays && setDays(tmpDays);
              console.log('Days', days);
            }}
            disabled={readonly}
            display={'default'}
            value={value}
            mode={'time'}
            timeZoneOffsetInMinutes={service ? 60 : 60}
            maximumDate={!normalTime ? maxDate : undefined}
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
