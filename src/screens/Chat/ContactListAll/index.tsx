import ContactItem from '../../../components/ContactItem';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { ScrollView } from 'react-native';
import styles from '~/screens/Chat/RecentMessages/styles';
import { COLOR } from '~/styles/constants';
import { useFindUserMutation, useGetAllDoctorsMutation } from '~/redux/api/authApi';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RegisterState } from '~/redux/slices/registerSlice';

import { LoaderScreen, View } from 'react-native-ui-lib';
import { useForm } from 'react-hook-form';
import { SearchSchema } from '~/screens/Chat/ContactListRecent/ContactListRecent';
import SearchingContact from '~/components/Chat/searchingContact';

const ContactListAll = ({ navigation, route }: NavigationProps<Routes.ContactListAll>) => {
  const [getAllDoctors, { isLoading }] = useGetAllDoctorsMutation();
  const [listDoctors, setListDoctors] = useState<RegisterState[]>([]);
  const [tmpConversations, setTmpConversations] = useState(listDoctors);
  const [findUser, { isLoading: isLoadingFindUser }] = useFindUserMutation();

  const getAllUsersHandler = useCallback(() => {
    getAllDoctors()
      .unwrap()
      .then((res) => {
        const listDoctors = res as RegisterState[];
        setListDoctors(listDoctors);
      });
  }, []);

  const { control, handleSubmit, formState } = useForm<SearchSchema>({
    mode: 'onChange',
    defaultValues: {
      fullName: ''
    }
  });
  const { isSubmitted } = formState;
  const onSubmit = (data: SearchSchema) => {
    findUser({ fullName: data.fullName, role: 1 })
      .unwrap()
      .then((res) => {
        const listDoctors = res as RegisterState[];
        setTmpConversations(listDoctors);
      });
  };

  useFocusEffect(getAllUsersHandler);

  return (
    <View style={[styles.columnContainer]}>
      <SearchingContact name={'fullName'} control={control} onSubmit={handleSubmit(onSubmit)} />

      {/*<View style={{ width: '100%'}}>*/}

      <ScrollView showsHorizontalScrollIndicator={false}>
        {/*<VStack space={4} alignItems="center" justifyContent="center">*/}
        {isSubmitted
          ? tmpConversations.map((doctor) => {
              return <ContactItem key={doctor.id} navigation={navigation} registerState={doctor} />;
            })
          : listDoctors.map((doctor) => {
              return <ContactItem key={doctor.id} navigation={navigation} registerState={doctor} />;
            })}

        {/*</VStack>*/}
        {isLoading || (isLoadingFindUser && <LoaderScreen color={COLOR.PRIMARY} />)}
      </ScrollView>

      {/*</View>*/}
    </View>
  );
};
export default ContactListAll;
