import {StyleSheet} from 'react-native';
import {horizontalScale, scaleFontSize} from '../../styles/scaling';

const style = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFF2F6',
    padding: horizontalScale(10),
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowResult: {
    flexDirection: 'row',
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  positiveColor: {
    color: '#3E9C35',
  },
  negativeColor: {
    color: '#FF0000',
  },
  chevron: {
    marginLeft: horizontalScale(5),
  },
  chevronColor: {
    color: '#1DA1F2',
  },
  textBlack: {
    color: 'black',
    fontSize: scaleFontSize(12),
  },
});

export default style;
