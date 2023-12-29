import { NavigationProps, Routes } from '~/router/navigationTypes';
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
  LocaleConfig
} from 'react-native-calendars';
import { COLOR } from '~/styles/constants';
import { useCallback, useState } from 'react';
import { useReadAvailableDatesForServiceMutation } from '~/redux/api/authApi';
import { useFocusEffect } from '@react-navigation/native';
import { MarkedDates } from 'react-native-calendars/src/types';
import { DefaultSectionT, SectionListData } from 'react-native';
import AgendaItem from '~/components/AgendaItem';

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
  today: 'Dzisiaj'
};
LocaleConfig.defaultLocale = 'pl';

interface sectionData {
  [key: string]: {
    title: string;
    data: dayData[];
  };
}

interface dayData {
  hour: string;
  duration: string;
  title: string;
}

const OfficeCalendar = ({ navigation, route }: NavigationProps<Routes.OfficeCalendar>) => {
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [sections, setSections] = useState<SectionListData<any>[]>([]);
  const [readAvailableDatesForService, { isLoading }] = useReadAvailableDatesForServiceMutation();
  const [day, setDay] = useState(new Date());
  const [dates, setDates] = useState<Date[]>([]);

  const freeDayHandler = useCallback(() => {
    readAvailableDatesForService({ serviceId: route.params.id })
      .unwrap()
      .then((res) => {
        let markedDatesTMP = {};
        const tmpDates: Date[] = [];
        // const tmpSections: SectionListData<any, DefaultSectionT>[] = [];
        // const tmp: sectionData = {};
        res.forEach((date) => {
          const tmpDate = new Date(date);
          tmpDates.push(tmpDate);

          markedDatesTMP = {
            ...markedDatesTMP,
            [tmpDate.getFullYear().toString() +
            '-' +
            (tmpDate.getUTCMonth() + 1).toString().padStart(2, '0') +
            '-' +
            tmpDate.getDate().toString().padStart(2, '0')]: {
              dotColor: COLOR.PRIMARY,
              color: COLOR.GREEN,
              customStyles: {
                container: {
                  backgroundColor: COLOR.GREEN,
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
        setMarkedDates(markedDatesTMP);
        setDates(tmpDates);
        setDay(new Date());
        // tmpSections.push(...Object.values(tmp));

        // setSections(tmpSections);
      });
  }, []);

  const onChangeDayHandler = useCallback(() => {
    const tmpSections: SectionListData<any, DefaultSectionT>[] = [];
    const tmp: sectionData = {};
    dates.forEach((date) => {
      if (
        date.getDate() === day.getDate() &&
        date.getMonth() === day.getMonth() &&
        date.getFullYear() === day.getFullYear()
      ) {
        const durationTMP = new Date(route.params.service.duration);
        const dayData: dayData = {
          hour: date.toString(),
          duration:
            durationTMP.getHours().toString() +
            ':' +
            durationTMP.getMinutes().toString().padStart(2, '0'),
          title: date.getHours().toString() + ':' + date.getMinutes().toString().padStart(2, '0')
        };
        const titleTMP =
          date.getFullYear().toString() +
          '-' +
          (date.getUTCMonth() + 1).toString().padStart(2, '0') +
          '-' +
          date.getDate().toString().padStart(2, '0');
        tmp[titleTMP] = {
          title: titleTMP,
          data: [...(tmp[titleTMP]?.data || []), dayData]
        };
      }
    });
    tmpSections.push(...Object.values(tmp));
    setSections(tmpSections);
  }, [day]);
  useFocusEffect(onChangeDayHandler);

  useFocusEffect(freeDayHandler);

  const onDayChange = (date: string) => {
    setDay(new Date(date));
  };

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem item={item} service={route.params.service} />;
  }, []);

  return (
    <CalendarProvider
      date={new Date().toDateString()}
      // onMonthChange={onMonthChange}
      onDateChanged={onDayChange}
      showTodayButton
      // disabledOpacity={0.6}
      // todayBottomMargin={16}
    >
      <ExpandableCalendar
        // horizontal={false}
        // hideArrows
        // disablePan
        hideKnob
        disableScrollViewPanResponder={true}
        // initialPosition={ExpandableCalendar.positions.OPEN}
        // calendarStyle={styles.calendar}
        // headerStyle={styles.header} // for horizontal only
        disableWeekScroll
        disableAllTouchEventsForDisabledDays
        displayLoadingIndicator={isLoading}
        firstDay={1}
        markingType={'custom'}
        minDate={new Date().toDateString()}
        markedDates={markedDates}
        animateScroll
        // closeOnDayPress={false}
      />
      <AgendaList
        sections={sections}
        renderItem={renderItem}
        windowSize={5}
        maxToRenderPerBatch={5}
        // scrollToNextEvent

        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
  );
};

export default OfficeCalendar;
