import ContactItem from '../../../components/ContactItem';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import styles from '~/screens/Chat/RecentMessages/styles';
import { COLOR } from '~/styles/constants';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LoaderScreen, View } from 'react-native-ui-lib';
import { getRecentConversationsStatesRedux, loginUserRedux } from '~/redux/api/giftedChat';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useGetUserByIdsMutation } from '~/redux/api/authApi';

const ContactListRecent = ({ navigation, route }: NavigationProps<Routes.ContactListAll>) => {
  const id = useAppSelector((state) => state.session.id);
  const chat = useAppSelector((state) => state.chat);
  const dispatchChat = useAppDispatch();
  const [getUserByIds] = useGetUserByIdsMutation();

  const getAllUsersHandler = useCallback(() => {
    dispatchChat(loginUserRedux(id!.toString())).then(() => {
      dispatchChat(getRecentConversationsStatesRedux(getUserByIds)).then();
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
        {chat.conversations.map((doctor) => {
          return <ContactItem key={doctor.id} navigation={navigation} registerState={doctor} />;
        })}

        {/*</VStack>*/}
        {chat.loading && <LoaderScreen color={COLOR.PRIMARY} />}
      </ScrollView>

      {/*</View>*/}
    </View>
  );
};
export default ContactListRecent;
