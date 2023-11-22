import { StyleSheet } from 'react-native';
import { COLOR } from '~/styles/constants';

export const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFieldRoot: { marginTop: 5, alignSelf: 'center' },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLOR.PRIMARY,
    textAlign: 'center',
    margin: 3
  },
  focusCell: {
    borderColor: COLOR.PRIMARY
  }
});
