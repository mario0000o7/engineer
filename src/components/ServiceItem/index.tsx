import { TextField, View } from 'react-native-ui-lib';

const ServiceItem = () => {
  return (
    <View margin-5 row={true}>
      <View>
        <TextField placeholder={'Nazwa usługi'} />
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <TextField placeholder={'Czas trwania'} />
      </View>
      <View style={{ marginLeft: 'auto' }}>
        <TextField placeholder={'Cena usługi'} />
      </View>
    </View>
  );
};

export default ServiceItem;
