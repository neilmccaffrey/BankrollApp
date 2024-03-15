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
  pressablesContainer: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
    marginBottom: verticalScale(8),
    alignItems: 'center',
  },
  press: {
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 30,
    padding: horizontalScale(5),
    alignItems: 'center',
    width: 105,
    justifyContent: 'space-between',
    marginRight: horizontalScale(20),
  },
  textColor: {
    color: 'black',
  },
  dateSize: {
    fontSize: scaleFontSize(20),
  },
  filtersContainer: {
    marginTop: verticalScale(30),
    //marginHorizontal: horizontalScale(20),
  },
  containerModal: {
    flex: 1,
    marginTop: verticalScale(28),
    marginHorizontal: horizontalScale(24),
  },
  clearButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: verticalScale(5),
    marginRight: horizontalScale(5),
  },
  textColorTrash: {
    color: 'white',
  },
  chevron: {
    marginLeft: horizontalScale(10),
  },
  chevronColor: {
    color: '#1DA1F2',
  },
  hidden: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingLeft: 15,
  },
  backRightButton: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    backgroundColor: '#FF0000',
    right: 0,
  },
  stakesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: horizontalScale(10),
    borderBottomWidth: 1,
    borderBottomColor: '#EFF2F6',
    backgroundColor: 'white',
  },
  buttonsModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: verticalScale(20),
  },
  justify: {
    justifyContent: 'space-between',
  },
});

export default style;
