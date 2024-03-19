import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#EFF2F6',
  },
  button: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(5),
    borderRightWidth: 1,
    borderRightColor: '#EFF2F6',
    justifyContent: 'center',
    width: verticalScale(115),
  },
  col: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonEnd: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(20),
    marginVertical: verticalScale(5),
    justifyContent: 'center',
    width: verticalScale(115),
  },
});
export default style;
