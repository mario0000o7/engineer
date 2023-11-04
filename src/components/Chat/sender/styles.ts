import { StyleSheet } from 'react-native';
import { COLOR } from '~/styles/constants';

const styles = StyleSheet.create({
  receiverContainer: {
    alignSelf: 'flex-end',
    flex: 1,
    height: 'auto',
    paddingRight: 10,
    paddingLeft: 10
  },
  receiverTimeContainer: {},
  receiverTime: {
    fontSize: 15,
    color: COLOR.LIGHT_GREY,
    paddingRight: 10
  },
  receiverMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: COLOR.WHITE,
    borderRadius: 15,
    minWidth: 200
  },
  receiverMessage: {
    paddingRight: 10,
    textAlign: 'right',
    color: COLOR.DARK_GREY,
    paddingLeft: 10
  },
  nameContainer: {
    textAlign: 'right',
    paddingRight: 10
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLOR.DARK_GREY
  },
  rowContainer: {
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'space-between',
    alignSelf: 'flex-end'
  },
  textStyle: {
    padding: 10,
    width: '100%',
  }
});
export default styles;
