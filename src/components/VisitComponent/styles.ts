import { StyleSheet } from 'react-native';
import { COLOR } from '~/styles/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOR.BACKGROUND,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
    marginTop: 10
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: 'auto'
  },
  columnContainer: {
    borderRadius: 10,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    width: '100%',
    height: 'auto',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10
  },

  itemContainer: {
    flexDirection: 'row'
  },
  title: {
    width: '100%',
    fontSize: 20,
    // fontWeight: 'bold',
    color: COLOR.DARK_GREY
  },
  shadow: {
    shadowColor: COLOR.DARK_GREY,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6
  }
});

export default styles;
