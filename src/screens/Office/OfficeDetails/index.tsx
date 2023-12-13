import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { ActivityIndicator } from 'react-native';
import { COLOR } from '~/styles/constants';
import ServiceItem from '~/components/ServiceItem';
import OfficeInputCustom from '~/components/OfficeInputCustom';
import { useForm } from 'react-hook-form';
import TimePickerCustom from '~/components/TimePickerCustom';
import {
  useCreateOfficeMutation,
  useDeleteOfficeMutation,
  useGetServicesByIdOwnerMutation,
  useUpdateOfficeMutation
} from '~/redux/api/authApi';
import { OfficeState } from '~/types/office';
import { useCallback, useState } from 'react';
import { ServiceState } from '~/types/service';
import { useFocusEffect } from '@react-navigation/native';
import ErrorChip from '~/components/ErrorChip';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export interface OfficeDetailsSchema {
  name: string;
  address1: string;
  address2: string;
  city: string;
  postalCode: string;
  timeFrom: Date;
  timeTo: Date;
}

const OfficeDetails = ({ navigation, route }: NavigationProps<Routes.OfficeDetails>) => {
  const [createOffice, { isLoading }] = useCreateOfficeMutation();
  const [updateOffice, { isLoading: isLoadingUpdate }] = useUpdateOfficeMutation();
  const [deleteOffice, { isLoading: isLoadingDelete }] = useDeleteOfficeMutation();

  const [resError, setResError] = useState('');
  const [getServicesByIdOwner, { isLoading: isLoadingServices }] =
    useGetServicesByIdOwnerMutation();
  const [services, setServices] = useState<ServiceState[]>([]);
  const { office } = route.params;
  const [timeFrom, setTimeFrom] = office?.timeFrom!
    ? useState<Date>(new Date(office?.timeFrom!))
    : useState<Date>(new Date());
  const onSubmitSave = (data: OfficeDetailsSchema) => {
    console.log(data);
    const officeTMP = data as OfficeState;
    officeTMP.ownerId = route.params.id;

    createOffice(officeTMP)
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setResError('Nie udało się dodać gabinetu');
      });
  };

  const onSubmitUpdate = (data: OfficeDetailsSchema) => {
    const office = data as OfficeState;
    office.ownerId = route.params.office!.ownerId;
    office.id = route.params.office!.id;
    updateOffice(office)
      .unwrap()
      .then((res) => {
        console.log(res);
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setResError('Nie udało się zaktualizować gabinetu');
      });
  };

  const onSubmitDelete = () => {
    console.log('delete');
    deleteOffice({ officeId: route.params.office?.id! })
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => {
        console.log(err);
        setResError('Nie udało się usunąć gabinetu');
      });
  };

  const serviceListHandler = useCallback(() => {
    if (route.params.create) return;
    getServicesByIdOwner({ officeId: route.params.office?.id! })
      .unwrap()
      .then((res) => {
        console.log(res);
        setServices(res);
      })
      .catch((err) => {
        console.log(err);
        setResError('Nie udało się pobrać usług');
      });
  }, []);
  useFocusEffect(serviceListHandler);

  const buttonsHandler = useCallback(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          {isLoading || isLoadingUpdate ? (
            <ActivityIndicator size={'large'} color={COLOR.PRIMARY} />
          ) : route.params.create ? (
            <View row={true}>
              <TouchableOpacity onPress={handleSubmit(onSubmitSave)}>
                <AntDesign name={'pluscircle'} size={35} color={COLOR.GREEN} />
              </TouchableOpacity>
            </View>
          ) : (
            <View row={true}>
              <TouchableOpacity onPress={handleSubmit(onSubmitDelete)}>
                <AntDesign name={'delete'} size={35} color={COLOR.RED} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 5 }} onPress={handleSubmit(onSubmitUpdate)}>
                <AntDesign name={'checkcircle'} size={35} color={COLOR.GREEN} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )
    });
  }, [navigation, isLoading, isLoadingUpdate, route.params.create, onSubmitSave, onSubmitUpdate]);
  useFocusEffect(buttonsHandler);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<OfficeDetailsSchema>({
    defaultValues: {
      name: office?.name ?? '',
      address1: office?.address1 ?? '',
      address2: office?.address2 ?? '',
      city: office?.city ?? '',
      postalCode: office?.postalCode ?? '',
      timeFrom: office?.timeFrom! ? new Date(office?.timeFrom!) : new Date(),
      timeTo: office?.timeTo! ? new Date(office?.timeTo!) : new Date()
    }
  });
  return (
    <View useSafeArea={true} backgroundColor={COLOR.BACKGROUND} style={{ height: '100%' }}>
      <View margin-10 flex={true}>
        <OfficeInputCustom
          name={'name'}
          error={errors.name?.message!}
          control={control}
          placeholder={'Nazwa gabinetu'}
        />
        <View row={true}>
          <View style={{ marginRight: 5, flex: 1 }}>
            <OfficeInputCustom
              placeholder={'Adres gabinetu 1'}
              control={control}
              error={errors.address1?.message!}
              name={'address1'}
            />
            <OfficeInputCustom
              placeholder={'Adres gabinetu 2 (opcjonalnie)'}
              control={control}
              error={errors.address2?.message!}
              name={'address2'}
            />
          </View>
          <View style={{ marginLeft: 'auto', width: 150 }}>
            <OfficeInputCustom
              name={'city'}
              error={errors.city?.message!}
              control={control}
              placeholder={'Miasto'}
            />
            <OfficeInputCustom
              name={'postalCode'}
              control={control}
              error={errors.postalCode?.message!}
              placeholder={'Kod pocztowy'}
            />
          </View>
        </View>
        <View marginB-10 centerH={true} centerV={true} row={true}>
          <Text style={{ width: 130, fontSize: 15 }}>Godziny pracy od:</Text>
          <TimePickerCustom
            name={'timeFrom'}
            control={control}
            normalTime={true}
            error={errors.timeFrom?.message}
            setTimeFrom={setTimeFrom}
          />
          <Text style={{ width: 20, textAlign: 'center', fontSize: 15, marginLeft: 10 }}>do</Text>
          <TimePickerCustom
            name={'timeTo'}
            control={control}
            normalTime={true}
            error={errors.timeTo?.message}
            refTimeFrom={timeFrom}
          />
        </View>
        {!route.params.create! && (
          <View useSafeArea={true} flex={true}>
            {/*<KeyboardAwareScrollView>*/}
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
              <ServiceItem
                create={true}
                officeId={office?.id!}
                setServices={setServices}
                setResError={setResError}
              />

              {services.map((service) => (
                <ServiceItem
                  key={service.id}
                  service={service}
                  setServices={setServices}
                  setResError={setResError}
                />
              ))}
              {isLoadingServices && <ActivityIndicator size={'large'} color={COLOR.PRIMARY} />}
            </KeyboardAwareScrollView>
            {/*</KeyboardAwareScrollView>*/}
          </View>
        )}
        {resError && <ErrorChip onClose={() => setResError('')} errorMsg={resError} />}
      </View>
      {/*</ScrollView>*/}
    </View>
  );
};
export default OfficeDetails;
