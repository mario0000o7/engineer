import React, { useCallback } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { ServiceState } from '~/types/service';
import { useCreateAppointmentMutation } from '~/redux/api/authApi';
import { AppointmentState } from '~/types/appointment';

interface ItemProps {
  item: any;
  service?: ServiceState;
}

const AgendaItem = (props: ItemProps) => {
  const { item, service } = props;
  const [createAppointment] = useCreateAppointmentMutation();

  const buttonPressed = useCallback(() => {
    console.log('AgendaItemHour', new Date(item.hour));
    const appointment: AppointmentState = {
      id: 0,
      date: new Date(item.hour),
      price: service?.price!,
      serviceId: service?.id!,
      userId: 4
    };
    createAppointment(appointment)
      .unwrap()
      .then((res) => {
        console.log('Appointment created');
        console.log(res);
      });
    console.log('Service', service);
  }, [item, service, createAppointment]);

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <Text style={styles.itemTitleText}>{item.duration}</Text>
      </View>
      <View style={styles.itemButtonContainer}>
        <Button color={'grey'} title={'Info'} onPress={buttonPressed} />
      </View>
    </View>
  );
};

export default React.memo(AgendaItem);

const styles = StyleSheet.create({
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  emptyItemText: {
    color: 'lightgrey',
    fontSize: 14
  }
});
