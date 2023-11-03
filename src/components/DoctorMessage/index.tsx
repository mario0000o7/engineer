import { View } from 'react-native';
import styles from '~/components/DoctorMessage/styles';
import { Button, Divider, IconButton, Text } from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon';
import { COLOR } from '~/styles/constants';

const DoctorMessage = ({ navigation, route }) => {
  // setDoctorName('Lek. Jan Kowalski')
  return (
    <View style={[styles.container]}>
      <View style={styles.rowContainer}>
        {/*<View style={styles.rowContainer}>*/}
        {/*<Avatar size='md' source={{uri:"https://www.w3schools.com/howto/img_avatar.png"}} style={{marginRight:"2%"}}/>*/}
        <View style={styles.columnContainer}>
          <Text style={styles.title}>Lek. Jan Kowalski</Text>
          <Text style={styles.title}>Ginekolog i Położnictwo</Text>
        </View>
        {/*</View>*/}
        <IconButton
          icon={'chat'}
          mode={'contained-tonal'}
          size={50}
          iconColor={COLOR.WHITE}
          style={{ backgroundColor: COLOR.PRIMARY }}
          // onPress={() => {
          //   navigation.navigate('MessageChat', { name: 'Lek. Jan Kowalski' });
          // }}
        />
      </View>
    </View>
  );
};
export default DoctorMessage;
