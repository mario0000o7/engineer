import { NavigationProps, Routes } from '~/router/navigationTypes';
import { Calendar } from 'react-native-calendars';
import { View } from 'react-native-ui-lib';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DayOffItem from '~/components/DayOffItem';
import { COLOR } from '~/styles/constants';
import {
  useGetAllDaysOffRetrieveByUserIdMutation,
  useGetOfficesByIdOwnerMutation
} from '~/redux/api/authApi';
import { useCallback, useState } from 'react';
import { useAppSelector } from '~/redux/hooks';
import { useFocusEffect } from '@react-navigation/native';
import { DayOffState } from '~/types/dayOff';
import { ActivityIndicator } from 'react-native';
import { OfficeState } from '~/types/office';

const randomColor = () => {
  const colors = [
    COLOR.GREEN,
    COLOR.ORANGE,
    COLOR.RED,
    COLOR.PURPLE,
    COLOR.BLUE,
    COLOR.YELLOW,
    COLOR.PINK
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const DaysOffList = ({ navigation }: NavigationProps<Routes.DaysOffList>) => {
  const id = useAppSelector((state) => state.session.id);
  const [getAllDaysOffRetrieveByUserId, { isLoading }] = useGetAllDaysOffRetrieveByUserIdMutation();
  const [dayOffList, setDayOffList] = useState<DayOffState[]>([]);
  const [offices, setOffices] = useState<OfficeState[]>([]);
  const [getOfficesByIdOwner, { isLoading: isLoadingOffices }] = useGetOfficesByIdOwnerMutation();
  const [markedDates, setMarkedDates] = useState<{ [key: string]: any }>({});

  const handleListDaysOff = useCallback(() => {
    getAllDaysOffRetrieveByUserId({ userId: id! })
      .unwrap()
      .then((res) => {
        setDayOffList(res as DayOffState[]);
      });
  }, []);

  const markedDatesHandler = useCallback(() => {
    const markedDatesTMP: { [key: string]: any } = {};
    dayOffList.forEach((dayOff) => {
      const color = randomColor();
      markedDatesTMP[new Date(dayOff.dateFrom).toISOString().split('T')[0]] = {
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
        },
        periods: [
          {
            startingDay: true,
            endingDay: true,
            color: color
          }
        ]
      };

      for (
        let i = new Date(dayOff.dateFrom);
        i.getTime() <= new Date(dayOff.dateTo).getTime();
        i.setDate(i.getDate() + 1)
      ) {
        markedDatesTMP[new Date(i).toISOString().split('T')[0]] = {
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
          },
          periods: [
            {
              startingDay: i.getDate() === new Date(dayOff.dateFrom).getDate(),
              endingDay: i.getDate() === new Date(dayOff.dateTo).getDate(),
              color: color
            }
          ]
        };
      }
    });
    setMarkedDates(markedDatesTMP);
  }, [dayOffList, setDayOffList]);

  const handleOffices = useCallback(() => {
    getOfficesByIdOwner({ ownerId: id! })
      .unwrap()
      .then((res) => {
        setOffices(res as OfficeState[]);
      });
  }, []);
  useFocusEffect(handleOffices);

  useFocusEffect(handleListDaysOff);
  useFocusEffect(markedDatesHandler);

  return (
    <View flex={true} backgroundColor={COLOR.BACKGROUND}>
      <Calendar markedDates={markedDates} markingType={'multi-period'} />
      <KeyboardAwareScrollView>
        {isLoading || isLoadingOffices ? (
          <ActivityIndicator size="large" color="#00ff00" />
        ) : (
          <>
            <DayOffItem onCreate={true} offices={offices} setDayOffList={setDayOffList} />
            {dayOffList.map((dayOff) => {
              return (
                <DayOffItem
                  key={dayOff.id}
                  dayOff={dayOff}
                  offices={offices}
                  setDayOffList={setDayOffList}
                />
              );
            })}
          </>
        )}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default DaysOffList;
