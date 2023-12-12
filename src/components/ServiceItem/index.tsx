import { Text, TextField, TouchableOpacity, View } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import TimePickerCustom from '~/components/TimePickerCustom';
import PriceInputCustom from '~/components/PriceInputCustom';
import { ServiceState } from '~/types/service';
import React from 'react';

export interface ServiceItemSchema {
  name: string;
  duration: Date;
  price: number;
}

interface ServiceItemProps {
  service?: ServiceState;
  create?: boolean;
  setServices?: React.Dispatch<React.SetStateAction<ServiceState[]>>;
}

const ServiceItem = ({ service, create }: ServiceItemProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ServiceItemSchema>({
    defaultValues: {
      name: create ? '' : service?.name!,
      duration: create ? new Date() : new Date(service?.duration!),
      price: create ? 0 : service?.price!
    }
  });

  const onSubmitCreate = (data: ServiceItemSchema) => {
    console.log(data);
  };
  const onSubmitUpdate = (data: ServiceItemSchema) => {
    console.log(data);
  };
  const onSubmitDelete = (data: ServiceItemSchema) => {
    console.log(data);
  };

  return (
    <View row={true} margin-5>
      <View>
        <View centerV={true} row={true}>
          <Text style={{ width: 100 }}>Nazwa usługi</Text>
          <Controller
            name={'name'}
            control={control}
            rules={{
              required: {
                value: true,
                message: 'Te pole jest wymagane'
              }
            }}
            render={({ field: { onChange, value } }) => (
              <TextField
                fieldStyle={{ borderBottomWidth: 2 }}
                style={{ fontFamily: 'Poppins_400Regular' }}
                onChangeText={onChange}
                value={value}
                placeholder={'Nazwa usługi'}
                floatingPlaceholder={false}
              />
            )}
          />
        </View>
        <View centerV={true} row={true}>
          <Text style={{ width: 90 }}>Czas trwania</Text>
          <TimePickerCustom control={control} name={'duration'} />
        </View>
        <View centerV={true} row={true}>
          <Text style={{ width: 100 }}>Cena</Text>
          <PriceInputCustom control={control} name={'price'} />
        </View>
      </View>
      <View style={{ marginLeft: 'auto' }}></View>
      <View centerV={true} row={true} style={{ marginLeft: 'auto' }}>
        {/*<TouchableOpacity>*/}
        {/*  <AntDesign name={'edit'} size={30} />*/}
        {/*</TouchableOpacity>*/}
        {create ? (
          <TouchableOpacity>
            <AntDesign style={{ marginLeft: 10 }} name={'plus'} size={30} />
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity>
              <AntDesign style={{ marginLeft: 10 }} name={'delete'} size={30} />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name={'save'} size={30} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ServiceItem;
