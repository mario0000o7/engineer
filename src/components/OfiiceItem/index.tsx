import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import Feather from 'react-native-vector-icons/Feather';
import { OfficeState } from '~/types/office';

interface OfficeItemProps {
  navigation: NavigationProps<Routes.OfficeList>['navigation'];
  office: OfficeState;
}

const OfficeItem = ({ navigation, office }: OfficeItemProps) => {
  return (
    <View
      backgroundColor={COLOR.BACKGROUND}
      style={{ borderWidth: 3, borderColor: COLOR.PRIMARY }}
      height={150}
      padding-10
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
        {office.name}
      </Text>
      <View row={true}>
        <View>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>{office.address1}</Text>
          <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>{office.city}</Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Routes.OfficeDetails, {
                id: 1,
                name: office.name,
                office: office
              });
            }}
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
