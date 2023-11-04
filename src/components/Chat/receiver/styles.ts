import { StyleSheet } from 'react-native';
import { COLOR } from '~/styles/constants';

const styles = StyleSheet.create({
  receiverContainer: {
    alignSelf: 'flex-start',
    flex: 1,
    height: 'auto',
    paddingLeft: 10,
    paddingRight: 10
  },
  receiverTimeContainer: {
  },
  receiverTime: {
    fontSize: 15,
    color: COLOR.LIGHT_GREY,
    paddingLeft: 10
  },
  receiverMessageContainer: {
    alignSelf: 'flex-start',
    backgroundColor: COLOR.WHITE,
    borderRadius: 15,
    minWidth: 200,
  },
  receiverMessage: {
    paddingLeft: 10,
    paddingRight: 10
  },
  nameContainer: {
    paddingLeft: 10
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
  },
  textStyle: {
    width: '100%',
    padding: 10,
  }
});
export default styles;
