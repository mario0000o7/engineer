import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import { RegisterState } from '~/redux/slices/registerSlice';
import { useGetUserByIdsMutation } from '~/redux/api/authApi';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ContactInformationModalProps extends RegisterState {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ContactInformationModal = (registerState: ContactInformationModalProps) => {
  console.log(registerState);
  const [getUserByIds, { isLoading }] = useGetUserByIdsMutation();
  const [register, setRegister] = useState<RegisterState>({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    phone: '',
    city: '',
    address1: '',
    address2: '',
    birthDate: undefined,
    country: '',
    id: 0,
    password: '',
    phoneCode: '',
    role: 0,
    title: '',
    unReadMessages: 0,
    postalCode: ''
  });

  const getUserByIdHandler = useCallback(() => {
    getUserByIds({ ids: [registerState.id!] })
      .unwrap()
      .then((res) => {
        setRegister(res[0]);
      });
  }, []);
  useFocusEffect(getUserByIdHandler);
  return (
    <View
      style={{
        backgroundColor: COLOR.BACKGROUND,
        width: 300,
        height: 450,
        borderRadius: 30,
        alignSelf: 'center'
      }}>
      {isLoading ? (
        <ActivityIndicator style={{ margin: 20 }} size={'large'} color={COLOR.PRIMARY} />
      ) : (
        <View margin-20>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imię: {register!.firstName}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Nazwisko: {register!.lastName}</Text>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold'
            }}>
            Płeć: {register!.gender === 'male' ? 'Mężczyzna' : 'Kobieta'}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Data urodzenia: {new Date(register!.birthDate!).toLocaleDateString()}
          </Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Email: {register!.email}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Telefon: {register!.phone}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Miasto: {register!.city}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ulica: {register!.address1}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Ulica: {register!.address2}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
            Kod pocztowy: {registerState.postalCode}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{ marginTop: 'auto', marginBottom: 30 }}
        onPress={() => registerState.setModalVisible(false)}>
        <Ionicons name={'close'} size={50} color={COLOR.PRIMARY} style={{ alignSelf: 'center' }} />
      </TouchableOpacity>
    </View>
  );
};

export default ContactInformationModal;
