import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, View } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { COLOR } from '~/styles/constants';

const OfficeDetails = ({ navigation, route }: NavigationProps<Routes.OfficeDetails>) => {
  return (
    <View useSafeArea={true} backgroundColor={COLOR.BACKGROUND}>
      <ScrollView style={{ height: '100%' }}>
        <Text>OfficeDetails</Text>
        <View row={true} centerH={true}>
          <Button buttonColor={COLOR.PRIMARY} mode={'contained'}>
            Anuluj
          </Button>
          <Button buttonColor={COLOR.GREEN} mode={'contained'}>
            {route.params.create ? 'Dodaj gabinet' : 'Zapisz'}
          </Button>
        </View>
        {route.params.create && (
          <Button buttonColor={COLOR.RED} mode={'contained'}>
            Usuń gabinet
          </Button>
        )}
      </ScrollView>
    </View>
  );
};
export default OfficeDetails;
