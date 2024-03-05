import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  button: {
    marginHorizontal: horizontalScale(15),
    marginVertical: verticalScale(5),
  },
});
export default style;
