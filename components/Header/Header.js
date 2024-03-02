import React from 'react';
import Button from '../Button/Button';
import {Text, View} from 'react-native';
import style from './style';
import {Routes} from '../../navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {resetToInitialState} from '../../redux/reducers/Bankroll';

const Header = ({navigation}) => {
  // const dispatch = useDispatch();
  // dispatch(resetToInitialState());
  //get bankroll amount
  const bankrollAmount = useSelector(state => state.bankroll.bankrollAmount);
  return (
    <View style={style.headerContainer}>
      <View style={style.bankrollContainer}>
        <Text style={style.brText}>Bankroll: </Text>
        <View>
          {/* multiply negative number by -1 and add negative sign to front*/}
          {bankrollAmount < 0 && (
            <Text style={style.bankRollNegativeColor}>
              -${(bankrollAmount * -1).toFixed(2)}
            </Text>
          )}
          {bankrollAmount > 0 && (
            <Text style={style.bankrollPositiveColor}>
              ${bankrollAmount.toFixed(2)}
            </Text>
          )}
          {bankrollAmount === 0 && (
            <Text style={style.brText}>${bankrollAmount.toFixed(2)}</Text>
          )}
        </View>
      </View>
      <View style={style.button}>
        <Button
          title={'+ Add Session'}
          isDisabled={false}
          onPress={() => navigation.navigate(Routes.Session)}
        />
      </View>
    </View>
  );
};

export default Header;
