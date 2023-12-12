import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, View } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ServiceState } from '~/types/service';
import { useFocusEffect } from '@react-navigation/native';

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
      .catch((err) => console.log(err));
  };

  const onSubmitDelete = () => {
    console.log('delete');
    deleteOffice({ officeId: route.params.office?.id! })
      .unwrap()
      .then(() => {
        navigation.goBack();
      })
      .catch((err) => console.log(err));
  };

  const serviceListHandler = useCallback(() => {
    getServicesByIdOwner({ officeId: route.params.office?.id! })
      .unwrap()
      .then((res) => {
        console.log(res);
        setServices(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useFocusEffect(serviceListHandler);

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
    <View useSafeArea={true} backgroundColor={COLOR.BACKGROUND}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        style={{ height: '100%' }}
        enableAutomaticScroll={true}>
        <ScrollView
          nestedScrollEnabled={true}
          style={{ height: '100%', backgroundColor: COLOR.BACKGROUND }}>
          <View margin-10>
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
            <View centerV={true} marginT-10 row={true}>
              <Text style={{ width: 130, fontSize: 15 }}>Godziny pracy od:</Text>
              <TimePickerCustom
                name={'timeFrom'}
                control={control}
                normalTime={true}
                error={errors.timeFrom?.message}
                setTimeFrom={setTimeFrom}
              />
              <Text style={{ width: 20, textAlign: 'center', fontSize: 15, marginLeft: 10 }}>
                do
              </Text>
              <TimePickerCustom
                name={'timeTo'}
                control={control}
                normalTime={true}
                error={errors.timeTo?.message}
                refTimeFrom={timeFrom}
              />
            </View>
            {!route.params.create! && (
              <>
                <View
                  centerH={true}
                  height={45}
                  row={true}
                  padding-5
                  marginT-10
                  style={{ borderBottomWidth: 3 }}>
                  <Text style={{ fontSize: 25 }}>Usługi</Text>
                </View>

                <ScrollView
                  style={{ height: 230 }}
                  nestedScrollEnabled={true}
                  showsVerticalScrollIndicator={false}>
                  {services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                  ))}
                  <ServiceItem create={true} />
                </ScrollView>
              </>
            )}
          </View>
          <View row={true} centerH={true}>
            <Button
              style={{ marginRight: 5 }}
              buttonColor={COLOR.PRIMARY}
              mode={'contained'}
              onPress={() => navigation.goBack()}>
              Anuluj
            </Button>
            <Button
              style={{ marginLeft: 5 }}
              loading={isLoading || isLoadingUpdate}
              buttonColor={COLOR.GREEN}
              mode={'contained'}
              onPress={
                route.params.create ? handleSubmit(onSubmitSave) : handleSubmit(onSubmitUpdate)
              }>
              {route.params.create ? 'Dodaj gabinet' : 'Zapisz'}
            </Button>
          </View>
          {!route.params.create && (
            <Button
              loading={isLoadingDelete}
              onPress={handleSubmit(onSubmitDelete)}
              style={{ marginTop: 15, width: 150, alignSelf: 'center' }}
              buttonColor={COLOR.RED}
              mode={'contained'}>
              Usuń gabinet
            </Button>
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default OfficeDetails;
