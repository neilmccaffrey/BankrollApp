import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../styles/scaling';

const style = StyleSheet.create({
  container: {
    marginHorizontal: horizontalScale(24),
    flex: 1,
    marginTop: verticalScale(20),
    justifyContent: 'space-between',
  },
  dropdown: {
    width: horizontalScale(130),
    borderWidth: 1,
    borderRadius: 50,
    padding: horizontalScale(5),
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
  pressablesContainer: {
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
    fontSize: scaleFontSize(20),
  },
  backButton: {
    marginBottom: verticalScale(20),
  },
  backButtonText: {
    color: '#1DA1F2',
  },
  delete: {
    backgroundColor: '#FF0000',
    borderRadius: horizontalScale(50),
    justifyContent: 'center',
    paddingHorizontal: horizontalScale(10),
    marginBottom: verticalScale(20),
  },
  title: {
    color: 'white',
    fontSize: scaleFontSize(15),
    textAlign: 'center',
    padding: horizontalScale(5),
  },
  containerModal: {
    flex: 1,
    marginTop: verticalScale(28),
    marginHorizontal: horizontalScale(24),
  },
  chevron: {
    marginLeft: horizontalScale(10),
  },
  chevronColor: {
    color: '#1DA1F2',
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
  input: {
    borderWidth: 1,
    borderColor: '#1DA1F2',
    paddingVertical: verticalScale(4),
    paddingLeft: horizontalScale(8),
    width: horizontalScale(80),
    borderRadius: 30,
  },
  inputContainer: {
    flexDirection: 'row',
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
});

export default style;
