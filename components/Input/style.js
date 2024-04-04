import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../styles/scaling';

const style = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#1DA1F2',
    paddingVertical: verticalScale(6),
    paddingLeft: horizontalScale(8),
    width: horizontalScale(120),
    borderRadius: 30,
    color: 'black',
  },
  label: {
    color: 'black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(6),
  },
  error: {
    fontSize: scaleFontSize(12),
    color: '#FF0000',
  },
});

export default style;
