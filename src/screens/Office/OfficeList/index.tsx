import { NavigationProps, Routes } from '~/router/navigationTypes';
import { LoaderScreen, TouchableOpacity, View } from 'react-native-ui-lib';
import OfficeItem from '~/components/OfiiceItem';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLOR } from '~/styles/constants';
import { useCallback, useState } from 'react';
import { useGetOfficesByIdOwnerMutation } from '~/redux/api/authApi';
import { useAppSelector } from '~/redux/hooks';
import { OfficeState } from '~/types/office';
import { useFocusEffect } from '@react-navigation/native';

const OfficeList = ({ navigation }: NavigationProps<Routes.OfficeList>) => {
  const [getOfficesByIdOwner, { isLoading }] = useGetOfficesByIdOwnerMutation();
  const [officeList, setOfficeList] = useState<OfficeState[]>([]);
  const role = useAppSelector((state) => state.session.role);

  const idOwner = useAppSelector((state) => state.session.id);
  const handleListOffice = useCallback(() => {
    getOfficesByIdOwner({ ownerId: idOwner! })
      .unwrap()
      .then((officeList) => {
        setOfficeList(officeList);
      });
  }, []);
  useFocusEffect(handleListOffice);

  return (
    <View useSafeArea={true} width={'100%'} backgroundColor={COLOR.BACKGROUND}>
      <View centerV={true} row={true} margin-10>
        <Searchbar
          style={{
            backgroundColor: COLOR.BACKGROUND,
            borderWidth: 3,
            borderColor: COLOR.PRIMARY,
            flex: 1
          }}
          value={''}
        />
        {role == 1 ? (
          <TouchableOpacity
            marginL-5
            onPress={() =>
              navigation.navigate(Routes.OfficeDetails, {
                create: true,
                name: 'Utwórz gabinet',
                id: idOwner!
              })
            }>
            <AntDesign name={'pluscircle'} size={50} color={COLOR.GREEN} />
          </TouchableOpacity>
        ) : undefined}
      </View>
      <ScrollView style={{ height: '100%' }}>
        {officeList.map((office) => (
          <OfficeItem key={office.id} navigation={navigation} office={office} />
        ))}
        {isLoading || (isLoading && <LoaderScreen color={COLOR.PRIMARY} />)}
      </ScrollView>
    </View>
  );
};
export default OfficeList;
