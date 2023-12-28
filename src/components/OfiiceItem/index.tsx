import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import { OfficeState } from '~/types/office';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

interface OfficeItemProps {
  navigation: NavigationProps<Routes.OfficeList>['navigation'];
  office: OfficeState;
  role: number;
}

const OfficeItem = ({ navigation, office, role }: OfficeItemProps) => {
  return (
    <View
      backgroundColor={COLOR.BACKGROUND}
      style={{
        borderWidth: 3,
        borderColor: COLOR.DARK_GREY,
        shadowColor: COLOR.DARK_GREY,
        shadowOffset: {
          width: 0,
          height: 4
        },
        shadowOpacity: 0.5,
        shadowRadius: 5.62,
        elevation: 6
      }}
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
        <View row={true}>
          <View>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>
              {office.address1}
            </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>
              {office.address2}
            </Text>
          </View>
          <View marginL-10>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>
              {office.postalCode}
            </Text>
            <Text style={{ fontFamily: 'Poppins_400Regular', fontSize: 15 }}>{office.city}</Text>
          </View>
        </View>
        <View row={true} style={{ marginLeft: 'auto' }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(Routes.OfficeServiceList, {
                id: office.id!,
                name: office.name
              });
            }}
            centerV={true}
            centerH={true}
            style={{ width: 50, height: 50 }}
            br40={true}
            backgroundColor={COLOR.PRIMARY}>
            <MaterialCommunityIcons name={'calendar-month'} color={COLOR.WHITE} size={30} />

            {/*<MaterialIcons name={'design-services'} color={COLOR.BLACK} size={30} />*/}
          </TouchableOpacity>
          {role === 1 ? (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(Routes.OfficeDetails, {
                  name: office.name,
                  office: office
                });
              }}
              centerV={true}
              centerH={true}
              style={{ width: 50, height: 50 }}
              br40={true}
              backgroundColor={COLOR.ORANGE}>
              <MaterialIcons name={'edit'} color={COLOR.BLACK} size={30} />

              {/*<MaterialIcons name={'design-services'} color={COLOR.BLACK} size={30} />*/}
            </TouchableOpacity>
          ) : undefined}
        </View>
      </View>
    </View>
  );
};
export default OfficeItem;
