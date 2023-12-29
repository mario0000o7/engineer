import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { ServiceState } from '~/types/service';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity } from 'react-native-ui-lib';
import { useCreateAppointmentMutation } from '~/redux/api/authApi';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import { useAppSelector } from '~/redux/hooks';

interface ItemProps {
  item: any;
  service?: ServiceState;
}

const AgendaItemContent = ({ item, service }: ItemProps) => {
  const navigation = useNavigation() as NavigationProps<Routes.OfficeCalendar>['navigation'];
  const [createAppointment, { isLoading }] = useCreateAppointmentMutation();
  const id = useAppSelector((state) => state.session.id);

  const buttonPressed = () => {
    console.log('AgendaItemHour', new Date(item.hour));
    const appointment = {
      date: new Date(item.hour),
      price: service?.price!,
      serviceId: service?.id!,
      userId: id!
    };
    createAppointment(appointment)
      .unwrap()
      .then((res) => {
        console.log('Appointment created');
        console.log(res);
        navigation.reset({
          index: 0,
          routes: [{ name: Routes.Calendar }]
        });
      })
      .catch((error) => {
        console.error('Error creating appointment:', error);
      });
    console.log('Service', service);
  };

  const { title, duration } = item;

  return (
    <View style={styles.item}>
      <View>
        <Text style={styles.itemTitleText}>{title}</Text>
        <Text style={styles.itemTitleText}>{duration}</Text>
      </View>
      <View style={styles.itemButtonContainer}>
        {isLoading ? (
          <ActivityIndicator size={'large'} color={'black'} />
        ) : (
          <TouchableOpacity onPress={buttonPressed}>
            <FontAwesome5Icon name={'calendar-check'} size={20} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

class AgendaItem extends React.Component<ItemProps> {
  shouldComponentUpdate(nextProps: Readonly<ItemProps>): boolean {
    return this.props.item !== nextProps.item;
  }

  render() {
    return <AgendaItemContent {...this.props} />;
  }
}

export default AgendaItem;

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
