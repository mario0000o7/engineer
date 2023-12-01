import ContactItem from '../../../components/ContactItem';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Searchbar } from 'react-native-paper';
import { ScrollView, View } from 'react-native';
import styles from '~/screens/Chat/RecentMessages/styles';
import { COLOR } from '~/styles/constants';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const RecentMessages = ({ navigation, route }: NavigationProps<Routes.RecentMessages>) => {
  const insets = useSafeAreaInsets();

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
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />
        <ContactItem navigation={navigation} route={route} />

        {/*</VStack>*/}
      </ScrollView>
      {/*</View>*/}
    </View>
  );
};
export default RecentMessages;
