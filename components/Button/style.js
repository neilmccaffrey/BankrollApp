import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../styles/scaling';

const style = StyleSheet.create({
  button: {
    backgroundColor: '#1DA1F2',
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    width: horizontalScale(100),
  },
  title: {
    color: 'white',
    fontSize: scaleFontSize(15),
    textAlign: 'center',
    paddingVertical: verticalScale(5),
  },
  disabled: {
    opacity: 0.5,
  },
  biggerButton: {
    alignItems: 'center',
    backgroundColor: '#1DA1F2',
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    paddingVertical: verticalScale(12),
    width: horizontalScale(300),
  },
});

export default style;
