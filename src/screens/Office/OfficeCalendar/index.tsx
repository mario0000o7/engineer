import { NavigationProps, Routes } from '~/router/navigationTypes';
import { View } from 'react-native-ui-lib';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-paper/src/components/Icon';
import { COLOR } from '~/styles/constants';
import { useState } from 'react';

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

const OfficeCalendar = ({ navigation }: NavigationProps<Routes.OfficeCalendar>) => {
  const [day, setDay] = useState('');

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        backgroundColor: COLOR.BACKGROUND
      }}>
      <Calendar
        style={{
          width: '100%',
          alignSelf: 'center',
          height: 'auto',
          borderColor: 'grey',
          backgroundColor: COLOR.BACKGROUND
        }}
        renderArrow={(direction) => {
          if (direction === 'left') {
            return <Icon source={'arrow-left-thick'} color={COLOR.PRIMARY} size={35} />;
          } else {
            return <Icon source={'arrow-right-thick'} color={COLOR.PRIMARY} size={35} />;
          }
        }}
        theme={{
          backgroundColor: COLOR.BACKGROUND,
          selectedDayBackgroundColor: COLOR.PRIMARY,
          calendarBackground: COLOR.BACKGROUND,
          textMonthFontWeight: 'bold',
          textMonthFontSize: 25
        }}
        minDate={new Date().toDateString()}
        onDayPress={(day) => {
          console.log('selected day', day);
          setDay(day.dateString);
        }}
        current={new Date().toDateString()}
        markedDates={{
          [day]: { selected: true, disableTouchEvent: true },
          '2023-10-16': {
            marked: true,
            dotColor: 'orange',
            disableTouchEvent: false,
            selected: day === '2023-10-16'
          }
        }}
      />
    </View>
  );
};

export default OfficeCalendar;
