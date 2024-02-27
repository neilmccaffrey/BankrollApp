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
  },
  title: {
    color: 'white',
    fontSize: scaleFontSize(15),
    textAlign: 'center',
    padding: horizontalScale(5),
  },
  disabled: {
    opacity: 0.5,
  },
  biggerButton: {
    backgroundColor: '#1DA1F2',
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    padding: horizontalScale(12),
  },
});

export default style;
