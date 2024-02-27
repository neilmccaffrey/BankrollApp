import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../styles/scaling';

const style = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFF2F6',
  },
  brText: {
    fontSize: scaleFontSize(18),
    textAlign: 'center',
    color: 'black',
  },
  button: {
    marginLeft: horizontalScale(220),
    marginBottom: verticalScale(5),
    width: horizontalScale(100),
    marginTop: verticalScale(20),
  },
  bankrollPositiveColor: {
    fontSize: scaleFontSize(18),
    color: '#3E9C35',
    textAlign: 'center',
  },
  bankRollNegativeColor: {
    fontSize: scaleFontSize(18),
    textAlign: 'center',
    color: '#FF0000',
  },
  bankrollContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default style;
