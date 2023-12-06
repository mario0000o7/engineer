import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import Feather from 'react-native-vector-icons/Feather';

interface OfficeItemProps {
  navigation: NavigationProps<Routes.OfficeList>['navigation'];
}

const OfficeItem = ({ navigation }: OfficeItemProps) => {
  return (
    <View
      backgroundColor={COLOR.BACKGROUND}
      style={{ borderWidth: 3, borderColor: COLOR.PRIMARY }}
      height={150}
      padding={10}
      br50={true}
      marginL-10
      marginR-10
      marginB-10>
      <Text
        numberOfLines={2}
        style={{
          fontFamily: 'Poppins_600SemiBold',
          fontSize: 25
        }}>
        Gabinet Stomatologiczny Ząbek
      </Text>
      <View row={true}>
        <View>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>ul. Wrocławska 12</Text>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>Lubin</Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <TouchableOpacity
            centerV={true}
            centerH={true}
            style={{ width: 50, height: 50 }}
            br40={true}
            backgroundColor={COLOR.ORANGE}>
            <Feather name={'edit'} color={COLOR.BLACK} size={30} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default OfficeItem;
