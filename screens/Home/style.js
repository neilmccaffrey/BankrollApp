import {StyleSheet} from 'react-native';
import {scaleFontSize, verticalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  emptyText: {
    marginTop: verticalScale(30),
    fontSize: scaleFontSize(20),
    color: 'black',
  },
  alignCenter: {
    alignItems: 'center',
  },
});

export default style;
