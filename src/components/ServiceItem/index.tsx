import { TextField, TouchableOpacity, View } from 'react-native-ui-lib';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { Controller, useForm } from 'react-hook-form';
import TimePickerCustom from '~/components/TimePickerCustom';
import PriceInputCustom from '~/components/PriceInputCustom';
import { ServiceState } from '~/types/service';
import React from 'react';
import {
  useCreateServiceMutation,
  useDeleteServiceMutation,
  useUpdateServiceMutation
} from '~/redux/api/authApi';
import { ActivityIndicator } from 'react-native';
import { COLOR } from '~/styles/constants';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useNavigation } from '@react-navigation/native';

export interface ServiceItemSchema {
  name: string;
  duration: Date;
  price: number;
}

interface ServiceItemProps {
  service?: ServiceState;
  create?: boolean;
  setServices?: React.Dispatch<React.SetStateAction<ServiceState[]>>;
  officeId?: number;
  setResError?: React.Dispatch<React.SetStateAction<string>>;
  readonly?: boolean;
}

const ServiceItem = ({
  service,
  create,
  setServices,
  officeId,
  setResError,
  readonly
}: ServiceItemProps) => {
  const minDate = new Date();
  minDate.setHours(0);
  minDate.setMinutes(0);
  minDate.setSeconds(0);
  minDate.setMilliseconds(0);
  const {
    control,
    handleSubmit,
    reset,

    formState: { errors, isDirty }
  } = useForm<ServiceItemSchema>({
    defaultValues: {
      name: create ? '' : service?.name!,
      duration: create ? minDate : new Date(service?.duration!),
      price: create ? 0 : service?.price!
    }
  });
  const navigation = useNavigation<NavigationProps<Routes.OfficeServiceList>['navigation']>();
  const [createService, { isLoading: isLoadingCreate }] = useCreateServiceMutation();
  const [deleteService, { isLoading: isLoadingDelete }] = useDeleteServiceMutation();
  const [updateService, { isLoading: isLoadingUpdate }] = useUpdateServiceMutation();

  const onSubmitCreate = (data: ServiceItemSchema) => {
    console.log('DATA SERVICE', data);
    const serviceTMP = data as ServiceState;
    serviceTMP.officeId = officeId!;
    createService(serviceTMP)
      .unwrap()
      .then((service) => {
        console.log(service);
        setServices!((prevState) => [...prevState, service]);
        console.log('success');
      })
      .catch(() => {
        setResError!('Nie udało się dodać usługi');
      });
  };
  const onSubmitUpdate = (data: ServiceItemSchema) => {
    console.log(data);
    const serviceTMP = data as ServiceState;
    serviceTMP.id = service?.id!;
    serviceTMP.officeId = service?.officeId!;
    updateService(serviceTMP)
      .unwrap()
      .then(() => {
        setServices!((prevState) => {
          const index = prevState.findIndex((item) => item.id === serviceTMP.id);
          prevState[index] = serviceTMP;
          return prevState;
        });
        reset({
          name: serviceTMP.name,
          duration: new Date(serviceTMP.duration),
          price: serviceTMP.price
        });
      })
      .catch(() => {
        setResError!('Nie udało się zaktualizować usługi');
      });
  };
  const onSubmitDelete = (data: ServiceItemSchema) => {
    console.log(data);
    deleteService({ serviceId: service?.id! })
      .unwrap()
      .then(() => {
        setServices!((prevState) => prevState.filter((item) => item.id !== service!.id));
      })
      .catch(() => {
        setResError!('Nie udało się usunąć usługi');
      });
  };

  return (
    <View
      style={{
        backgroundColor: COLOR.WHITE,
        borderWidth: 2,
        borderRadius: 10,
        shadowColor: COLOR.DARK_GREY,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.19,
        shadowRadius: 5.62,
        elevation: 6
      }}
      row={true}
      margin-5>
      <View margin-10>
        <View centerV={true} row={true}>
          {/*<Text style={{ width: 100 }}>Nazwa usługi</Text>*/}
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
                fieldStyle={{ borderBottomWidth: readonly ? 0 : 2 }}
                style={{ fontFamily: 'Poppins_400Regular' }}
                onChangeText={onChange}
                value={value}
                placeholder={'Nazwa usługi'}
                floatingPlaceholder={false}
                enableErrors={true}
                validateOnChange={true}
                editable={!readonly}
                color={COLOR.BLACK}
                validationMessage={[errors.name?.message!]}
              />
            )}
          />
        </View>
        <View row={true}>
          <View centerV={true} row={true}>
            <PriceInputCustom control={control} name={'price'} readonly={readonly} />
          </View>
          <View centerV={true} row={true}>
            <TimePickerCustom
              control={control}
              name={'duration'}
              readonly={readonly}
              service={true}
            />
          </View>
        </View>
      </View>
      <View
        margin-10
        centerV={true}
        row={true}
        style={{
          marginLeft: 'auto'
        }}>
        {!readonly ? (
          <>
            {create ? (
              !isLoadingCreate ? (
                <TouchableOpacity onPress={handleSubmit(onSubmitCreate)}>
                  <AntDesign
                    style={{ marginLeft: 10 }}
                    name={'plus'}
                    size={30}
                    color={COLOR.GREEN}
                  />
                </TouchableOpacity>
              ) : (
                <ActivityIndicator size="large" color="#0000ff" />
              )
            ) : (
              <>
                {isLoadingCreate || isLoadingDelete || isLoadingUpdate ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <>
                    <TouchableOpacity onPress={handleSubmit(onSubmitDelete)}>
                      <AntDesign
                        style={{ marginLeft: 10 }}
                        name={'delete'}
                        size={30}
                        color={COLOR.RED}
                      />
                    </TouchableOpacity>
                    {isDirty && (
                      <TouchableOpacity onPress={handleSubmit(onSubmitUpdate)}>
                        <AntDesign name={'save'} size={30} color={COLOR.ORANGE} />
                      </TouchableOpacity>
                    )}
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.OfficeCalendar, {
                  id: service?.id!,
                  name: service?.name!,
                  service: service!
                });
              }}
              centerV={true}
              centerH={true}
              style={{ width: 50, height: 50 }}
              br40={true}
              backgroundColor={COLOR.PRIMARY}>
              <MaterialCommunityIcons name={'calendar-month'} color={COLOR.WHITE} size={30} />

              {/*<MaterialIcons name={'design-services'} color={COLOR.BLACK} size={30} />*/}
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default ServiceItem;
