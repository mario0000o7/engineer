import ContactItem from '../../../components/ContactItem';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import styles from '~/screens/Chat/RecentMessages/styles';
import { COLOR } from '~/styles/constants';
import { useGetAllDoctorsMutation } from '~/redux/api/authApi';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { RegisterState } from '~/redux/slices/registerSlice';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native-ui-lib';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ContactListAll = ({ navigation, route }: NavigationProps<Routes.ContactListAll>) => {
  const [getAllDoctors, { isLoading }] = useGetAllDoctorsMutation();
  const [listDoctors, setListDoctors] = useState<RegisterState[]>([]);

  const getAllUsersHandler = useCallback(() => {
    getAllDoctors()
      .unwrap()
      .then((res) => {
        const listDoctors = res as RegisterState[];
        console.log(listDoctors);
        setListDoctors(listDoctors);
      });
  }, []);

  useFocusEffect(getAllUsersHandler);

  return (
    <View style={[styles.columnContainer]}>
      <Searchbar
        style={{
          marginRight: 10,
          marginLeft: 10,
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: COLOR.BACKGROUND,
          borderWidth: 1
        }}
        placeholder="Wyszukaj lekarza"
        onChangeText={() => {}}
        value={''}
      />
      {/*<View style={{ width: '100%'}}>*/}
      <ScrollView showsHorizontalScrollIndicator={false}>
        {/*<VStack space={4} alignItems="center" justifyContent="center">*/}
        {listDoctors.map((doctor) => {
          return <ContactItem key={doctor.id} navigation={navigation} registerState={doctor} />;
        })}

        {/*</VStack>*/}
      </ScrollView>
      {/*</View>*/}
    </View>
  );
};
export default ContactListAll;
