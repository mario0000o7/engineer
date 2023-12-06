import { NavigationProps, Routes } from '~/router/navigationTypes';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import OfficeItem from '~/components/OfiiceItem';
import { Searchbar } from 'react-native-paper';
import { ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { COLOR } from '~/styles/constants';

const OfficeList = ({ navigation }: NavigationProps<Routes.OfficeList>) => {
  return (
    <View useSafeArea={true} width={'100%'} backgroundColor={COLOR.BACKGROUND}>
      <View centerV={true} row={true} margin={10}>
        <Searchbar
          style={{
            backgroundColor: COLOR.BACKGROUND,
            borderWidth: 3,
            borderColor: COLOR.PRIMARY,
            flex: 1
          }}
        />
        <TouchableOpacity marginL-5>
          <AntDesign name={'pluscircle'} size={50} color={COLOR.GREEN} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ height: '100%' }}>
        <OfficeItem navigation={navigation} />
        <OfficeItem navigation={navigation} />
        <OfficeItem navigation={navigation} />
      </ScrollView>
    </View>
  );
};
export default OfficeList;
