import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Text, TextField, View } from 'react-native-ui-lib';
import { ScrollView } from 'react-native';
import { Button } from 'react-native-paper';
import { COLOR } from '~/styles/constants';
import ServiceItem from '~/components/ServiceItem';

const OfficeDetails = ({ navigation, route }: NavigationProps<Routes.OfficeDetails>) => {
  return (
    <View useSafeArea={true} backgroundColor={COLOR.BACKGROUND}>
      <ScrollView nestedScrollEnabled={true} style={{ height: '100%' }}>
        <View margin-10>
          <TextField
            fieldStyle={{ borderBottomWidth: 2 }}
            style={{
              fontFamily: 'Poppins_400Regular',
              fontSize: 15
            }}
            floatingPlaceholderColor={COLOR.PRIMARY}
            placeholder={'Nazwa gabinetu'}
            floatingPlaceholder={true}
          />
          <View row={true}>
            <View style={{ marginRight: 5, flex: 1 }}>
              <TextField
                fieldStyle={{ borderBottomWidth: 2 }}
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 15
                }}
                floatingPlaceholderColor={COLOR.PRIMARY}
                placeholder={'Adres gabinetu 1'}
                floatingPlaceholder={true}
              />
              <TextField
                fieldStyle={{ borderBottomWidth: 2 }}
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 15
                }}
                floatingPlaceholderColor={COLOR.PRIMARY}
                placeholder={'Adres gabinetu 2 (opcjonalnie)'}
                floatingPlaceholder={true}
              />
            </View>
            <View style={{ marginLeft: 'auto' }}>
              <TextField
                fieldStyle={{ borderBottomWidth: 2 }}
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 15
                }}
                floatingPlaceholderColor={COLOR.PRIMARY}
                placeholder={'Miasto'}
                floatingPlaceholder={true}
              />
              <TextField
                fieldStyle={{ borderBottomWidth: 2 }}
                style={{
                  fontFamily: 'Poppins_400Regular',
                  fontSize: 15
                }}
                floatingPlaceholderColor={COLOR.PRIMARY}
                placeholder={'Kod pocztowy'}
                floatingPlaceholder={true}
              />
            </View>
          </View>
          <View height={30} row={true} padding-5 marginT-10 style={{ borderBottomWidth: 3 }}>
            <View>
              <Text>Nazwa usługi</Text>
            </View>
            <View style={{ marginLeft: 'auto' }}>
              <Text>Czas trwania</Text>
            </View>
            <View style={{ marginLeft: 'auto' }}>
              <Text>Cena usługi</Text>
            </View>
          </View>
          <ScrollView
            style={{ height: 200 }}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}>
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
            <ServiceItem />
          </ScrollView>
        </View>
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
