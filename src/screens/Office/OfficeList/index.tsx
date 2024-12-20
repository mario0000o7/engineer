import { NavigationProps, Routes } from '~/router/navigationTypes';
import { LoaderScreen, TouchableOpacity, View } from 'react-native-ui-lib';
import OfficeItem from '~/components/OfiiceItem';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLOR } from '~/styles/constants';
import { useCallback, useState } from 'react';
import { useGetOfficesByIdOwnerMutation, useRetrieveAllMutation } from '~/redux/api/authApi';
import { useAppSelector } from '~/redux/hooks';
import { OfficeState } from '~/types/office';
import { useFocusEffect } from '@react-navigation/native';
import { Controller, useForm } from 'react-hook-form';

interface SearchOffice {
  nameOffice: string;
}

const OfficeList = ({ navigation }: NavigationProps<Routes.OfficeList>) => {
  const [getOfficesByIdOwner, { isLoading }] = useGetOfficesByIdOwnerMutation();
  const [officeList, setOfficeList] = useState<OfficeState[]>([]);
  const role = useAppSelector((state) => state.session.role);
  const [tmpOfficeList, setTmpOfficeList] = useState<OfficeState[]>([]);
  const [retrieveAll, { isLoading: isLoadingRetrieveAll }] = useRetrieveAllMutation();

  const idOwner = useAppSelector((state) => state.session.id);
  const handleListOffice = useCallback(() => {
    console.log('ROLE', role);
    if (role === 2) {
      retrieveAll({ nameOffice: '' })
        .unwrap()
        .then((res) => {
          const listOffice = res as OfficeState[];
          setOfficeList(listOffice);
        });
    } else {
      getOfficesByIdOwner({ ownerId: idOwner! })
        .unwrap()
        .then((officeList) => {
          setOfficeList(officeList);
        });
    }
  }, []);
  useFocusEffect(handleListOffice);

  const { control, handleSubmit, formState } = useForm<SearchOffice>({
    mode: 'onChange',
    defaultValues: {
      nameOffice: ''
    }
  });
  const { isSubmitted } = formState;

  const onSubmit = (data: SearchOffice) => {
    if (role === 2) {
      retrieveAll({ nameOffice: data.nameOffice })
        .unwrap()
        .then((res) => {
          const listOffice = res as OfficeState[];
          setTmpOfficeList(listOffice);
        });
    } else {
      console.log('DATA', data);
      const result = officeList.filter((office) => {
        return office.name!.toLowerCase().includes(data.nameOffice.toLowerCase());
      });
      console.log(result);
      setTmpOfficeList(result);
    }
  };

  return (
    <View useSafeArea={true} width={'100%'} backgroundColor={COLOR.BACKGROUND}>
      <View centerV={true} row={true} margin-10>
        <Controller
          name={'nameOffice'}
          control={control}
          render={({ field: { onChange, value, onBlur } }) => (
            <Searchbar
              style={{
                backgroundColor: COLOR.BACKGROUND,
                borderWidth: 3,
                borderColor: COLOR.PRIMARY,
                flex: 1
              }}
              onBlur={onBlur}
              onChangeText={(text) => {
                onChange(text);
                onSubmit({ nameOffice: text });
              }}
              onEndEditing={handleSubmit(onSubmit)}
              placeholder={'Wyszukaj gabinet'}
              value={value}
              onClearIconPress={() => (value = '')}
            />
          )}
        />
        {role == 1 ? (
          <TouchableOpacity
            marginL-5
            onPress={() =>
              navigation.navigate(Routes.OfficeDetails, {
                create: true,
                name: 'Utwórz gabinet'
              })
            }>
            <AntDesign name={'pluscircle'} size={50} color={COLOR.GREEN} />
          </TouchableOpacity>
        ) : undefined}
      </View>
      <ScrollView style={{ height: '100%' }}>
        {isSubmitted
          ? tmpOfficeList.map((office) => (
              <OfficeItem key={office.id} navigation={navigation} office={office} role={role!} />
            ))
          : officeList.map((office) => (
              <OfficeItem key={office.id} navigation={navigation} office={office} role={role!} />
            ))}

        {isLoading || (isLoadingRetrieveAll && <LoaderScreen color={COLOR.PRIMARY} />)}
      </ScrollView>
    </View>
  );
};
export default OfficeList;
