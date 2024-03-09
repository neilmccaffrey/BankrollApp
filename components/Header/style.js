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
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: verticalScale(5),
    marginTop: verticalScale(20),
    marginHorizontal: horizontalScale(10),
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
  centerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: horizontalScale(10),
    marginBottom: verticalScale(250),
    marginTop: verticalScale(100),
    height: '25%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default style;
