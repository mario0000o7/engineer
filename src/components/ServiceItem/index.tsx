import { Text, TextField, TouchableOpacity, View } from 'react-native-ui-lib';
import { AntDesign } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import TimePickerCustom from '~/components/TimePickerCustom';
import PriceInputCustom from '~/components/PriceInputCustom';

export interface ServiceItemSchema {
  name: string;
  duration: Date;
  price: number;
}

const ServiceItem = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ServiceItemSchema>({
    defaultValues: {
      name: '',
      duration: new Date(),
      price: 0
    }
  });

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
        <TouchableOpacity>
          <AntDesign name={'edit'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign style={{ marginLeft: 10 }} name={'delete'} size={30} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ServiceItem;
