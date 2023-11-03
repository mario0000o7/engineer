import { Text } from 'react-native-paper';
import styles from '~/components/VisitComponent/styles';
import { TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-paper';
import Icon from 'react-native-paper/src/components/Icon';

export const VisitComponent = () => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View style={styles.columnContainer}>
        <Text style={styles.title}>Wizyta położnicza + USG ciąży do 11 tygodnia</Text>
        <View style={styles.rowContainer}>
          <Text
            style={{ fontSize: 25, fontWeight: 'bold', color: 'black', verticalAlign: 'middle' }}>
            Godzina
          </Text>
          <View style={styles.itemContainer}>
            <TouchableOpacity style={{alignItems:'center',justifyContent:'center'}} onPress={() => console.log('Pressed')}>
              <Icon color={'black'} source={'information-outline'} size={34} />
            </TouchableOpacity>
            <Button
              textColor={'black'}
              style={{ justifyContent: 'center' }}
              mode={'contained'}
              onPress={() => console.log('Pressed')}>
              Odwołaj
            </Button>
          </View>
        </View>
        <View style={styles.rowContainer}>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>12:45</Text>
          </View>
          <View style={styles.itemContainer}>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>12:45</Text>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                color: 'black',
                paddingLeft: 10
              }}>
              -
            </Text>
            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', paddingLeft: 10 }}>
              13:30
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default VisitComponent;
