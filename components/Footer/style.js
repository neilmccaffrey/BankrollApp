import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    marginHorizontal: horizontalScale(15),
    marginVertical: verticalScale(5),
    alignItems: 'center',
  },
});
export default style;
