import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../styles/scaling';

const style = StyleSheet.create({
  backButton: {
    marginBottom: verticalScale(20),
    marginHorizontal: horizontalScale(16),

    marginTop: verticalScale(20),
  },
  backButtonText: {
    color: '#1DA1F2',
  },
  radioButtonsContainer: {
    flexDirection: 'row',
    marginHorizontal: horizontalScale(15),
    justifyContent: 'space-between',
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
  textColorTrash: {
    color: 'white',
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
    marginHorizontal: horizontalScale(20),
  },
  containerModal: {
    flex: 1,
    marginTop: verticalScale(28),
    marginHorizontal: horizontalScale(24),
  },
  container: {
    marginTop: verticalScale(5),
  },
  justify: {
    justifyContent: 'space-between',
  },
  clearButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: verticalScale(5),
    marginRight: horizontalScale(5),
  },
});

export default style;
