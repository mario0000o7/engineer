import { CalendarProvider, ExpandableCalendar, TimelineList } from 'react-native-calendars';
import { useCallback, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
import { FloatingButton } from 'react-native-ui-lib';

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
}

interface Events {
  [key: string]: Event[];
}

const CalendarScreen = ({ navigation }: NavigationProps<Routes.Calendar>) => {
  const [day, setDay] = useState(new Date());
  const insets = useSafeAreaInsets();
  const role = useAppSelector((state) => state.session.role);
  const id = useAppSelector((state) => state.session.id);
  const [getAppointment, { isLoading: isLoadingAppointment }] =
    role === 1 ? useGetAppointmentsByDoctorIdMutation() : useGetAppointmentsByUserIdMutation();
  const [events, setEvents] = useState<Events>({});
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});

  const getAppointmentHandler = useCallback(() => {
    getAppointment({ userId: id! })
      .unwrap()
      .then((res) => {
        let markedDatesTMP = {};
        const eventsTMP: Events = {};
        res.forEach((appointment) => {
          const date = new Date(appointment.date).toISOString().split('T')[0];
          const dateTMP = new Date(appointment.date);
          const startDate = new Date(appointment.date);
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
              id: appointment.id!.toString()
            });
          } else {
            eventsTMP[date] = [
              {
                start: startDate.toISOString(),
                end: endDate.toISOString(),
                title: appointment.services!.name,
                summary: appointment.services!.offices!.name,
                id: appointment.id!.toString()
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
          }
        }}
        scrollToNow
        scrollToFirst
        // initialTime={{ hour: new Date().getHours(), minutes: new Date().getMinutes() }}
      />
      <FloatingButton
        visible={true}
        button={{ label: 'Approve', onPress: () => console.log('approved') }}
      />
    </CalendarProvider>
  );
};
export default CalendarScreen;
