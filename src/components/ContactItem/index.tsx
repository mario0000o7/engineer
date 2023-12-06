import { View } from 'react-native-ui-lib';
import styles from '~/components/ContactItem/styles';
import { IconButton, Text } from 'react-native-paper';
import { COLOR } from '~/styles/constants';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { RegisterState } from '~/redux/slices/registerSlice';

interface ContactItemProps {
  navigation:
    | NavigationProps<Routes.ContactListAll>['navigation']
    | NavigationProps<Routes.ContactListRecent>['navigation'];
  registerState: RegisterState;
}

const ContactItem = ({ navigation, registerState }: ContactItemProps) => {
  // setDoctorName('Lek. Jan Kowalski')

  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.rowContainer}>
        {/*<View style={styles.rowContainer}>*/}
        {/*<Avatar size='md' source={{uri:"https://www.w3schools.com/howto/img_avatar.png"}} style={{marginRight:"2%"}}/>*/}
        <View style={styles.columnContainer}>
          <Text style={styles.title}>{registerState.title}</Text>
          <Text style={styles.title}>
            {registerState.firstName} {registerState.lastName}
          </Text>
        </View>
        {/*</View>*/}
        <View style={{ flexDirection: 'row' }}>
          {registerState.unReadMessages! >= 1 && registerState.unReadMessages! !== undefined && (
            <View
              style={{
                backgroundColor: COLOR.LIGHT_GREEN,
                height: 20,
                width: 20,
                borderRadius: 20,
                marginRight: -15,
                marginTop: 4
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
            style={{ backgroundColor: COLOR.PRIMARY }}
            onPress={() => {
              navigation.navigate(Routes.Message, {
                name: `Lek. ${registerState.firstName} ${registerState.lastName}`,
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
