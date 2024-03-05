import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../styles/scaling';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    marginTop: verticalScale(20),
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backButtonText: {
    color: '#1DA1F2',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF2F6',
    padding: horizontalScale(10),
  },
  text: {
    fontSize: scaleFontSize(18),
    textAlign: 'center',
    color: 'black',
  },
  textPos: {
    fontSize: scaleFontSize(18),
    color: '#3E9C35',
    textAlign: 'center',
  },
  textNeg: {
    fontSize: scaleFontSize(18),
    textAlign: 'center',
    color: '#FF0000',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  buttons: {
    borderWidth: 1,
    borderColor: '#1DA1F2',
    flex: 1,
    alignItems: 'center',
    paddingVertical: verticalScale(5),
    marginHorizontal: horizontalScale(2),
    borderRadius: 50,
  },
  isPressed: {
    backgroundColor: '#1DA1F2',
  },
  textWhite: {
    color: 'white',
  },
  textBlack: {
    color: 'black',
  },
});

export default style;
