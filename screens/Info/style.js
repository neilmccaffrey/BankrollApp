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
  deleteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFF2F6',
    borderTopWidth: 1,
    borderTopColor: '#EFF2F6',
    padding: horizontalScale(10),
    justifyContent: 'space-between',
  },
  delete: {
    flexDirection: 'row',
  },
  text: {
    fontSize: scaleFontSize(18),
    color: 'black',
  },
});

export default style;
