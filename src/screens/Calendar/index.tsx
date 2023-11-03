import { Calendar } from 'react-native-calendars';
import { Text } from 'react-native-paper';
import { useState } from 'react';
import { Platform, ScrollView, View } from 'react-native';

import { LocaleConfig } from 'react-native-calendars/src/index';
import { VisitComponent } from '~/components/VisitComponent';
import { styles } from '~/screens/Calendar/styles';
import { COLOR } from '~/styles/constants';
import Icon from 'react-native-paper/src/components/Icon';
import { NavigationProps, Routes } from '~/router/navigationTypes';

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

const CalendarScreen = ({ navigation }: NavigationProps<Routes.Calendar>) => {
  const [day, setDay] = useState('');
  if (Platform.OS === 'web') {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: COLOR.BACKGROUND
        }}>
        <View style={styles.hBox}>
          <View style={{ height: '100%', width: '50%' }}>
            <Calendar
              style={{ width: '100%', height: '100%' }}
              renderArrow={(direction) => {
                if (direction === 'left') {
                  return <Icon source={'arrow-left-thick'} color={COLOR.PRIMARY} size={45} />;
                } else {
                  return <Icon source={'arrow-right-thick'} color={COLOR.PRIMARY} size={45} />;
                }
              }}
              theme={{
                // @ts-ignore
                'stylesheet.calendar.main': {
                  container: {
                    // height: '100%',
                    width: '100%',
                    backgroundColor: COLOR.BACKGROUND
                  },
                  week: {
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }
                },
                'stylesheet.day.basic': {
                  selected: {
                    borderRadius: 100,
                    backgroundColor: COLOR.PRIMARY
                  },
                  base: {
                    width: 100,
                    height: 100,
                    alignItems: 'center'
                  },
                  text: {
                    fontSize: 45,
                    textAlign: 'center',
                    marginTop: 15,
                    marginBottom: 0
                  },
                  container: {
                    alignSelf: 'stretch',
                    alignItems: 'center'
                  }
                },
                dotStyle: {
                  width: 10,
                  height: 10,
                  borderRadius: 5
                },

                // textDayFontSize: 20,
                textDayHeaderFontSize: 15,
                textMonthFontSize: 40,

                textMonthFontWeight: 'bold',
                backgroundColor: COLOR.BACKGROUND,
                selectedDayBackgroundColor: COLOR.PRIMARY,
                calendarBackground: COLOR.BACKGROUND
              }}
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
          <View style={{ height: '100%', width: '50%', backgroundColor: COLOR.BACKGROUND }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 40,
                fontWeight: 'bold',
                color: 'black',
                paddingTop: 10,
                paddingBottom: 10
              }}>
              Wizyty
            </Text>
            <ScrollView>
              <VisitComponent />
              <VisitComponent />
              <VisitComponent />
              <VisitComponent />
              <VisitComponent />
              <VisitComponent />
              <VisitComponent />
              <VisitComponent />
              <VisitComponent />
            </ScrollView>
          </View>
        </View>
      </View>
    );
  } else
    return (
      <View
        style={{
          justifyContent: 'center',
          width: '100%',
          height: '100%',
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
              return <Icon source={'arrow-left-thick'} color={COLOR.PRIMARY} size={45} />;
            } else {
              return <Icon source={'arrow-right-thick'} color={COLOR.PRIMARY} size={45} />;
            }
          }}
          theme={{
            backgroundColor: COLOR.BACKGROUND,
            selectedDayBackgroundColor: COLOR.PRIMARY,
            calendarBackground: COLOR.BACKGROUND,
            textMonthFontWeight: 'bold',
            textMonthFontSize: 30
          }}
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
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 40,
            fontWeight: 'bold',
            color: 'black',
            paddingTop: 10,
            paddingBottom: 10
          }}>
          Wizyty
        </Text>
        <ScrollView style={{ width: '100%', alignSelf: 'center' }}>
          <VisitComponent />
          <VisitComponent />
          <VisitComponent />
          <VisitComponent />
          <VisitComponent />
          <VisitComponent />
          <VisitComponent />
          <VisitComponent />
        </ScrollView>
      </View>
    );
};
export default CalendarScreen;
