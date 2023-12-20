import { NavigationProps, Routes } from '~/router/navigationTypes';
import { View } from 'react-native-ui-lib';
import ServiceItem from '~/components/ServiceItem';
import { ActivityIndicator } from 'react-native';
import { COLOR } from '~/styles/constants';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ErrorChip from '~/components/ErrorChip';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ServiceState } from '~/types/service';
import { useGetServicesByIdOwnerMutation } from '~/redux/api/authApi';

const OfficeServicesList = ({ navigation, route }: NavigationProps<Routes.OfficeServiceList>) => {
  const [resError, setResError] = useState('');
  const [services, setServices] = useState<ServiceState[]>([]);
  const [getServicesByIdOwner, { isLoading: isLoadingServices }] =
    useGetServicesByIdOwnerMutation();

  const serviceListHandler = useCallback(() => {
    getServicesByIdOwner({ officeId: route.params.id })
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

  return (
    <View useSafeArea={true} flex={true}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            setServices={setServices}
            setResError={setResError}
            readonly={true}
          />
        ))}
        {isLoadingServices && <ActivityIndicator size={'large'} color={COLOR.PRIMARY} />}
      </KeyboardAwareScrollView>
      {resError && <ErrorChip onClose={() => setResError('')} errorMsg={resError} />}
    </View>
  );
};

export default OfficeServicesList;
