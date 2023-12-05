import { View } from 'react-native-ui-lib';
import styles from '~/components/ContactItem/styles';
import { IconButton, Text } from 'react-native-paper';
import { COLOR } from '~/styles/constants';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { RegisterState } from '~/redux/slices/registerSlice';
import { useAppSelector } from '~/redux/hooks';

interface ContactItemProps {
  navigation: NavigationProps<Routes.ContactListAll>['navigation'];
  registerState: RegisterState;
}

const ContactItem = ({ navigation, registerState }: ContactItemProps) => {
  // setDoctorName('Lek. Jan Kowalski')
  const id = useAppSelector((state) => state.session.id);
  const token = useAppSelector((state) => state.session.token);

  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.rowContainer}>
        {/*<View style={styles.rowContainer}>*/}
        {/*<Avatar size='md' source={{uri:"https://www.w3schools.com/howto/img_avatar.png"}} style={{marginRight:"2%"}}/>*/}
        <View style={styles.columnContainer}>
          <Text style={styles.title}>
            Lek. {registerState.firstName} {registerState.lastName}
          </Text>
          <Text style={styles.title}>Ginekolog i Położnictwo</Text>
        </View>
        {/*</View>*/}
        <View style={{ flexDirection: 'row' }}>
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
              {!registerState !== 0 ? registerState.unReadMessages : 0}
            </Text>
          </View>
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
