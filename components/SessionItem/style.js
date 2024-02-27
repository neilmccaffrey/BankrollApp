import {StyleSheet} from 'react-native';
import {horizontalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  border: {
    borderBottomWidth: 1,
    borderBottomColor: '#EFF2F6',
    padding: horizontalScale(10),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rowResult: {
    flexDirection: 'row',
  },
  result: {
    justifyContent: 'center',
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
});

export default style;
