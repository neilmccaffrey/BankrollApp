import {StyleSheet} from 'react-native';
import {scaleFontSize, verticalScale} from '../../styles/scaling';

const style = StyleSheet.create({
  emptyText: {
    marginTop: verticalScale(30),
    fontSize: scaleFontSize(20),
    color: 'black',
  },
  alignCenter: {
    alignItems: 'center',
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
  textColor: {
    color: 'white',
  },
});

export default style;
