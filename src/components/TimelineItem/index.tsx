import React from 'react';
import { ActivityIndicator, Text } from 'react-native';
import { View } from 'react-native-ui-lib';
import { COLOR } from '~/styles/constants';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { ServiceState } from '~/types/service';
import { useDeleteAppointmentMutation } from '~/redux/api/authApi';

interface ItemProps {
  item: any;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AgendaItemContent = ({ item, setModalVisible }: ItemProps) => {
  const startDate = new Date(item.start);
  const endDate = new Date(item.end);
  const navigation = useNavigation() as NavigationProps<Routes.Calendar>['navigation'];
  const [deleteAppointment, { isLoading: isLoadingDelete }] = useDeleteAppointmentMutation();

  const start = startDate.getHours() + ':' + startDate.getMinutes().toString().padStart(2, '0');
  const end = endDate.getHours() + ':' + endDate.getMinutes().toString().padStart(2, '0');

  const moveAppointment = () => {
    const service: ServiceState = {
      id: item.service.id,
      name: item.service.name,
      duration: item.service.duration,
      price: item.service.price,
      officeId: item.officeId
    };
    console.log('ITEM', item);
    navigation.reset({
      index: 0,
      routes: [
        {
          name: Routes.OfficeNavigator,
          state: {
            routes: [
              {
                name: Routes.OfficeList
              },
              {
                name: Routes.OfficeCalendar,
                params: {
                  id: service.id,
                  service: service,
                  name: service.name,
                  move: true,
                  appointmentId: parseInt(item.id)
                }
              }
            ]
          }
        }
      ]
    });

    setModalVisible(false);
  };

  const deleteAppointmentButton = () => {
    console.log('deleteAppointment');
    deleteAppointment({ appointmentId: parseInt(item.id) })
      .unwrap()
      .then((res) => {
        console.log('Appointment deleted');
        console.log(res);
        navigation.reset({
          index: 0,
          routes: [{ name: Routes.Calendar }]
        });
      })
      .catch((error) => {
        console.error('Error deleting appointment:', error);
      });
  };
  return (
    <View centerV={true} centerH={true} style={{}}>
      <View
        backgroundColor={COLOR.BACKGROUND}
        width={300}
        height={400}
        style={{
          borderRadius: 10,
          padding: 30
        }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.title}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.summary}</Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {start}-{end}
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.price} zł</Text>
        {isLoadingDelete ? (
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: 'auto' }}
            size={'large'}
            color={COLOR.PRIMARY}
          />
        ) : (
          <View
            style={{
              marginTop: 'auto',
              alignSelf: 'center'
            }}>
            <View row={true}>
              <Button
                mode={'contained'}
                style={{ marginTop: 20 }}
                buttonColor={COLOR.ORANGE}
                onPress={moveAppointment}>
                <Text style={{ color: COLOR.WHITE }}>Przesuń</Text>
              </Button>
              <Button
                mode={'contained'}
                style={{ marginTop: 20, marginLeft: 10 }}
                onPress={deleteAppointmentButton}
                buttonColor={COLOR.RED}>
                <Text style={{ color: COLOR.WHITE }}>Odwołaj</Text>
              </Button>
            </View>
            <Button
              mode={'text'}
              style={{ marginTop: 20, width: 100, alignSelf: 'center' }}
              onPress={() => setModalVisible(false)}>
              <Text style={{ color: COLOR.PRIMARY }}>Anuluj</Text>
            </Button>
          </View>
        )}
      </View>
    </View>
  );
};

class TimelineItem extends React.Component<ItemProps> {
  shouldComponentUpdate(nextProps: Readonly<ItemProps>): boolean {
    return this.props.item !== nextProps.item;
  }

  render() {
    return <AgendaItemContent {...this.props} />;
  }
}

export default TimelineItem;
