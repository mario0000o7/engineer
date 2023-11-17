import { NavigationProps, Routes } from '~/router/navigationTypes';
import { View } from 'react-native';

const DoctorList = ({ route, navigation }: NavigationProps<Routes.DoctorList>) => {
  return (
    <View style={{ flex: 1 }}>
      {/*<View style={{ width: '90%', alignSelf: 'center' }}>*/}
      {/*  <Input variant="underlined" borderColor="black">*/}
      {/*    <InputSlot>*/}
      {/*      <InputIcon as={SearchIcon} color={'black'} />*/}
      {/*    </InputSlot>*/}

      {/*    <InputField pl="$3" placeholder="Wyszukaj lekarza" />*/}
      {/*  </Input>*/}
      {/*  <ScrollView>*/}
      {/*    <VStack space={4} alignItems="center" justifyContent="center">*/}
      {/*      <DoctorMessage navigation={navigation} route={route} />*/}
      {/*    </VStack>*/}
      {/*  </ScrollView>*/}
      {/*</View>*/}
    </View>
  );
};
export default DoctorList;
