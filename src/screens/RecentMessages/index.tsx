import DoctorMessage from '../../components/DoctorMessage';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Searchbar } from 'react-native-paper';
import { Platform, ScrollView, View } from 'react-native';
import styles from '~/screens/RecentMessages/styles';

const RecentMessages = ({ route, navigation }: NavigationProps<Routes.RecentMessages>) => {
  return (
    <View style={styles.columnContainer}>
      {/*<View style={{ width: '90%', alignSelf: 'center' }}>*/}
      {/*<Searchbar style={{marginRight:10,marginLeft:10}} placeholder="Wyszukaj lekarza" onChangeText={() => {}} value={''} />*/}
      <View style={{ width: '100%', height: '100%' }}>
        <ScrollView>
          {/*<VStack space={4} alignItems="center" justifyContent="center">*/}
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />
          <DoctorMessage navigation={navigation} route={route} />

          {/*</VStack>*/}
        </ScrollView>
      </View>
    </View>
  );
};
export default RecentMessages;
