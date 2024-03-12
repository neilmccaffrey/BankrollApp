import {StyleSheet} from 'react-native';
import {horizontalScale, verticalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(5),
  },
  radioCircle: {
    height: horizontalScale(20),
    width: horizontalScale(20),
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    height: horizontalScale(14),
    width: horizontalScale(14),
    borderRadius: 20,
    backgroundColor: '#1DA1F2',
  },
  label: {
    marginLeft: horizontalScale(10),
  },
});

export default style;
