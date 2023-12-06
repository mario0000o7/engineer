import ContactItem from '../../../components/ContactItem';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { ScrollView } from 'react-native';
import { COLOR } from '~/styles/constants';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { LoaderScreen, View } from 'react-native-ui-lib';
import { getRecentConversationsStatesRedux, loginUserRedux } from '~/redux/api/giftedChat';
import { useAppDispatch, useAppSelector } from '~/redux/hooks';
import { useGetUserByIdsMutation } from '~/redux/api/authApi';
import SearchingContact from '~/components/Chat/searchingContact';
import { useForm } from 'react-hook-form';
import styles from '~/screens/Chat/ContactListRecent/styles';

export interface SearchSchema {
  fullName: string;
}

const ContactListRecent = ({ navigation, route }: NavigationProps<Routes.ContactListRecent>) => {
  const id = useAppSelector((state) => state.session.id);
  const mail = useAppSelector((state) => state.session.email);
  const chat = useAppSelector((state) => state.chat);
  const dispatchChat = useAppDispatch();
  const [tmpConversations, setTmpConversations] = useState(chat.conversations);
  const [getUserByIds] = useGetUserByIdsMutation();

  const getAllUsersHandler = useCallback(() => {
    dispatchChat(loginUserRedux(id!.toString(), mail!)).then(() => {
      dispatchChat(getRecentConversationsStatesRedux(getUserByIds)).then();
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
    const result = chat.conversations.filter((conversation) => {
      return (
        conversation.firstName!.toLowerCase().includes(data.fullName.toLowerCase()) ||
        conversation.lastName!.toLowerCase().includes(data.fullName.toLowerCase())
      );
    });
    setTmpConversations(result);
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
          : chat.conversations.map((doctor) => {
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
