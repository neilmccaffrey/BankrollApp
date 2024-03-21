import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../styles/scaling';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(16),
    flex: 1,
    marginTop: verticalScale(20),
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backButtonText: {
    color: '#1DA1F2',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF2F6',
    borderTopWidth: 1,
    borderTopColor: '#EFF2F6',
    padding: horizontalScale(10),
    justifyContent: 'space-between',
  },
  buttonItems: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: scaleFontSize(18),
    color: 'black',
    marginLeft: horizontalScale(15),
  },
  supportContainer: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(2),
  },
  supportText: {
    color: 'black',
    fontWeight: 'bold',
  },
  tyText: {
    color: 'black',
    marginHorizontal: horizontalScale(10),
    marginBottom: verticalScale(10),
  },
  justify: {
    justifyContent: 'space-between',
  },
});

export default style;
