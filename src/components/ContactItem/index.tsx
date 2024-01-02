import { Dialog, TouchableOpacity, View } from 'react-native-ui-lib';
import styles from '~/components/ContactItem/styles';
import { IconButton, Text } from 'react-native-paper';
import { COLOR } from '~/styles/constants';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { RegisterState } from '~/redux/slices/registerSlice';
import Feather from 'react-native-vector-icons/Feather';
import ContactInformationModal from '~/components/ContactInformationModal';
import { useState } from 'react';

interface ContactItemProps {
  navigation:
    | NavigationProps<Routes.ContactListAll>['navigation']
    | NavigationProps<Routes.ContactListRecent>['navigation'];
  registerState: RegisterState;
}

const ContactItem = ({ navigation, registerState }: ContactItemProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  // setDoctorName('Lek. Jan Kowalski')

  return (
    <View style={[styles.container, styles.shadow]}>
      <Dialog visible={modalVisible} onDismiss={() => setModalVisible(false)}>
        <ContactInformationModal {...registerState} setModalVisible={setModalVisible} />
      </Dialog>
      <View style={styles.rowContainer}>
        <TouchableOpacity style={{ alignSelf: 'center' }} onPress={() => setModalVisible(true)}>
          <Feather name={'user'} size={50} color={COLOR.PRIMARY} style={{ alignSelf: 'center' }} />
        </TouchableOpacity>

        <View style={styles.columnContainer}>
          <Text style={styles.title}>{registerState.title}</Text>
          <Text style={styles.title}>
            {registerState.firstName} {registerState.lastName}
          </Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          {registerState.unReadMessages! >= 1 && registerState.unReadMessages! !== undefined && (
            <View
              style={{
                backgroundColor: COLOR.LIGHT_GREEN,
                height: 20,
                width: 20,
                borderRadius: 20,
                marginRight: -15,
                marginBottom: -17
              }}>
              <Text style={{ textAlign: 'center', marginTop: 1 }}>
                {registerState.unReadMessages <= 99 && registerState.unReadMessages >= 1
                  ? registerState.unReadMessages
                  : 99}
              </Text>
            </View>
          )}
          <IconButton
            icon={'chat'}
            mode={'contained-tonal'}
            size={50}
            iconColor={COLOR.WHITE}
            style={{ backgroundColor: COLOR.PRIMARY, marginLeft: 'auto' }}
            onPress={() => {
              navigation.navigate(Routes.Message, {
                name: `${registerState.title} ${registerState.firstName} ${registerState.lastName}`,
                id: registerState.id!
              });
            }}
          />
        </View>
      </View>
    </View>
  );
};
export default ContactItem;
