import { StyleSheet } from 'react-native';
import { COLOR } from '~/styles/constants';

export const styles = StyleSheet.create({
  tabContent: {
    backgroundColor: COLOR.BACKGROUND,
    transform: [{ translateY: -2 }],

  },
  tabLabel: {
    fontSize: 15
  },

  tabScreen: {
    backgroundColor: COLOR.BACKGROUND,

  }
});

export default styles;
