import { CalendarProvider, ExpandableCalendar, TimelineList } from 'react-native-calendars';
import { useCallback, useState } from 'react';

import { LocaleConfig } from 'react-native-calendars/src/index';
import { NavigationProps, Routes } from '~/router/navigationTypes';
import {
  useGetAppointmentsByDoctorIdMutation,
  useGetAppointmentsByUserIdMutation
} from '~/redux/api/authApi';
import { useAppSelector } from '~/redux/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { MarkedDates } from 'react-native-calendars/src/types';
import { COLOR } from '~/styles/constants';
import { Dialog } from 'react-native-ui-lib';
import TimelineItem from '~/components/TimelineItem';
import { ServiceState } from '~/types/service';
import * as Notifications from 'expo-notifications';
import { subMinutes } from 'date-fns';
import { Platform } from 'react-native';

LocaleConfig.locales['pl'] = {
  monthNames: [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień'
  ],
  monthNamesShort: [
    'Sty.',
    'Lut.',
    'Mar.',
    'Kwi.',
    'Maj',
    'Cze.',
    'Lip.',
    'Sie.',
    'Wrz.',
    'Paź.',
    'Lis.',
    'Gru.'
  ],
  dayNames: ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'],
  dayNamesShort: ['Nie.', 'Pon.', 'Wt.', 'Śr.', 'Czw.', 'Pt.', 'Sob.'],
  today: "Dzisiaj'"
};
LocaleConfig.defaultLocale = 'pl';

interface Event {
  id?: string;
  start: string;
  end: string;
  title: string;
  summary: string;
  color?: string;
  price?: number;
  service?: ServiceState;
}

interface Events {
  [key: string]: Event[];
}

const CalendarScreen = ({ navigation }: NavigationProps<Routes.Calendar>) => {
  const role = useAppSelector((state) => state.session.role);
  const id = useAppSelector((state) => state.session.id);
  const [event, setEvent] = useState<Event>();
  const [getAppointment, { isLoading: isLoadingAppointment }] =
    role === 1 ? useGetAppointmentsByDoctorIdMutation() : useGetAppointmentsByUserIdMutation();
  const [events, setEvents] = useState<Events>({});
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [visible, setVisible] = useState(false);

  const getAppointmentHandler = useCallback(() => {
    getAppointment({ userId: id! })
      .unwrap()
      .then(async (res) => {
        try {
          if (Platform.OS !== 'web') await Notifications.cancelAllScheduledNotificationsAsync();
        } catch (err) {
          //
        }
        let markedDatesTMP = {};
        console.log('Appointments', res);
        const eventsTMP: Events = {};
        res.forEach((appointment) => {
          const date = new Date(appointment.date).toISOString().split('T')[0];
          const dateTMP = new Date(appointment.date);
          const startDate = new Date(appointment.date);
          Notifications.scheduleNotificationAsync({
            content: {
              title: 'Przypomnienie o wizycie',
              body: `Za 15 minut masz wizytę u ${appointment.services!.offices!.name} na usłudze ${
                appointment.services!.name
              }`
            },
            trigger: {
              date: subMinutes(startDate, 15)
            }
          });
          const duration = new Date(appointment.services!.duration);
          const endDate = new Date(
            startDate.getTime() +
              duration.getHours() * 60 * 60 * 1000 +
              duration.getMinutes() * 60 * 1000
          );

          if (eventsTMP[date]) {
            eventsTMP[date].push({
              start: startDate.toISOString(),
              end: endDate.toISOString(),
              title: appointment.services!.name,
              summary: appointment.services!.offices!.name,
              id: appointment.id!.toString(),
              price: appointment.price,
              service: appointment.services
            });
          } else {
            eventsTMP[date] = [
              {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                title: appointment.services!.name,
                summary: appointment.services!.offices!.name,
                id: appointment.id!.toString(),
                price: appointment.price,
                service: appointment.services
              }
            ];
          }
          markedDatesTMP = {
            ...markedDatesTMP,
            [date]: {
              dotColor: COLOR.PRIMARY,
              color: COLOR.GREEN,
              customStyles: {
                container: {
                  backgroundColor: dateTMP < new Date() ? COLOR.ORANGE : COLOR.GREEN,
                  borderRadius: 50
                },
                text: {
                  color: COLOR.WHITE,
                  fontWeight: 'bold'
                }
              }
            }
          };
        });
        setEvents(eventsTMP);
        setMarkedDates(markedDatesTMP);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useFocusEffect(getAppointmentHandler);

  // if (Platform.OS === 'web') {
  return (
    <CalendarProvider
      date={new Date().toDateString()}
      showTodayButton
      disabledOpacity={0.6}
      // numberOfDays={3}
    >
      <ExpandableCalendar
        hideKnob
        disableAllTouchEventsForDisabledDays
        animateScroll
        disableScrollViewPanResponder={true}
        firstDay={1}
        markingType={'custom'}
        markedDates={markedDates}
        displayLoadingIndicator={isLoadingAppointment}
      />
      <TimelineList
        events={events}
        showNowIndicator
        timelineProps={{
          onEventPress: (event) => {
            console.log('event pressed', event);
            const eventTMP = event as Event;
            setEvent({
              id: eventTMP.id,
              start: eventTMP.start,
              end: eventTMP.end,
              title: eventTMP.title,
              summary: eventTMP.summary!,
              price: eventTMP.price!,
              service: eventTMP.service!
            });
            setVisible(true);
          }
        }}
        scrollToNow
        scrollToFirst
        // initialTime={{ hour: new Date().getHours(), minutes: new Date().getMinutes() }}
      />
      <Dialog visible={visible} onDismiss={() => setVisible(false)}>
        <TimelineItem item={event} setModalVisible={setVisible} />
      </Dialog>
    </CalendarProvider>
  );
};
export default CalendarScreen;
