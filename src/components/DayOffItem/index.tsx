import { Picker, PickerFieldTypes, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { DayOffState } from '~/types/dayOff';
import DateInputCustom from '~/components/DateInputCustom';
import { Controller, useForm } from 'react-hook-form';
import { COLOR } from '~/styles/constants';
import { AntDesign } from '@expo/vector-icons';
import {
  useCreateDayOffMutation,
  useDeleteDayOffMutation,
  useUpdateDayOffMutation
} from '~/redux/api/authApi';
import React from 'react';
import { OfficeState } from '~/types/office';
import { ActivityIndicator } from 'react-native';

interface DayOffSchema {
  dateTo: Date;
  dateFrom: Date;
  officeId: number;
}

const DayOffItem = ({
  dayOff,
  onCreate,
  setDayOffList,
  offices
}: {
  dayOff?: DayOffState;
  onCreate?: boolean;
  setDayOffList?: React.Dispatch<React.SetStateAction<DayOffState[]>>;
  offices: OfficeState[];
}) => {
  const [createDayOff, { isLoading }] = useCreateDayOffMutation();

  const [updateDayOff, { isLoading: isLoadingUpdate }] = useUpdateDayOffMutation();
  const [deleteDayOff, { isLoading: isLoadingDelete }] = useDeleteDayOffMutation();
  const [refDate, setRefDate] = React.useState<Date>(new Date());

  const { control, handleSubmit } = useForm<DayOffSchema>({
    mode: 'onChange',
    defaultValues: {
      dateFrom: onCreate ? new Date() : new Date(dayOff!.dateFrom),
      dateTo: onCreate ? new Date() : new Date(dayOff!.dateTo),
      officeId: onCreate ? 0 : dayOff!.officeId!
    }
  });

  const createButton = async (data: DayOffSchema) => {
    createDayOff({ ...data })
      .unwrap()
      .then((res) => {
        setDayOffList!((prev) => [...prev, res]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteButton = async (data: DayOffSchema) => {
    deleteDayOff({ dayOffId: dayOff!.id! })
      .unwrap()
      .then(() => {
        setDayOffList!((prev) => prev.filter((dayOffTMP) => dayOffTMP.id !== dayOff!.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateButton = async (data: DayOffSchema) => {
    updateDayOff({ ...data, id: dayOff!.id! })
      .unwrap()
      .then(() => {
        setDayOffList!((prev) => {
          const clear = prev.filter((dayOffTMP) => dayOffTMP.id !== dayOff!.id);
          return [...clear, { ...data, id: dayOff!.id! }];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <View
      style={{ backgroundColor: COLOR.BACKGROUND, justifyContent: 'space-between' }}
      paddingB-5
      paddingT-5
      row={true}>
      <View padding-5 row={true} centerV={true}>
        <View>
          <View row={true} centerV={true}>
            <Text
              style={{
                fontSize: 20
              }}>
              Od:
            </Text>
            <DateInputCustom
              name={'dateFrom'}
              control={control}
              isUnMaxDate={true}
              setRefDate={setRefDate}
              isMinDate={true}
            />
          </View>
          <View centerV={true} row={true}>
            {/*<Text style={{ fontSize: 25 }}>:</Text>*/}
            <Text
              style={{
                fontSize: 20
              }}>
              Do:
            </Text>

            <DateInputCustom
              name={'dateTo'}
              control={control}
              isUnMaxDate={true}
              isMinDate={true}
              refDate={refDate}
            />
          </View>
        </View>
        <Controller
          rules={{
            required: {
              value: true,
              message: 'Wybierz biuro'
            },
            min: 1
          }}
          name={'officeId'}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Picker
              value={value}
              defaultValue={''}
              style={{
                marginLeft: 3
              }}
              onBlur={onBlur}
              fieldStyle={{
                flexWrap: 'wrap',
                width: 150
              }}
              placeholderTextColor={COLOR.BLACK}
              useWheelPicker={true}
              fieldType={PickerFieldTypes.filter}
              onChange={(value) => {
                onChange(value);
              }}>
              <Picker.Item value={0} label={''} />
              {offices.map((office) => {
                return <Picker.Item key={office.id} value={office.id!} label={office.name} />;
              })}
            </Picker>
          )}
        />
      </View>
      <View row={true}>
        {onCreate ? (
          <>
            {isLoading ? (
              <ActivityIndicator size="large" color="#00ff00" />
            ) : (
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={handleSubmit(createButton)}>
                <AntDesign name={'plus'} size={35} color={COLOR.GREEN} />
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            {isLoadingUpdate || isLoadingDelete ? (
              <ActivityIndicator />
            ) : (
              <>
                <TouchableOpacity
                  style={{ alignSelf: 'center' }}
                  onPress={handleSubmit(updateButton)}>
                  <AntDesign name={'save'} size={35} color={COLOR.ORANGE} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ alignSelf: 'center' }}
                  onPress={handleSubmit(deleteButton)}>
                  <AntDesign name={'delete'} size={35} color={COLOR.RED} />
                </TouchableOpacity>
              </>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default DayOffItem;
