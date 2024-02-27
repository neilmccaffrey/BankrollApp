import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
  },
  dropdown: {
    width: horizontalScale(180),
    borderWidth: 1,
    borderRadius: 50,
    padding: horizontalScale(8),
    borderColor: '#1DA1F2',
    marginBottom: verticalScale(12),
    marginLeft: horizontalScale(10),
  },
  button: {
    marginBottom: verticalScale(15),
    width: '100%',
  },
  dropdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: verticalScale(8),
    alignItems: 'center',
  },
  textColor: {
    color: 'black',
  },
  press: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    padding: horizontalScale(5),
    alignItems: 'center',
  },
  dateSize: {
    fontSize: horizontalScale(16),
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backButtonText: {
    color: '#1DA1F2',
  },
});

export default style;
