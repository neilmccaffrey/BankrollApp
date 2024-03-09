import React from 'react';
import {Pressable, Text, View} from 'react-native';
import PropTypes from 'prop-types';

import style from './style';

import dateFormat from 'dateformat';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const SessionItem = ({
  result,
  gameType,
  date,
  hours,
  minutes,
  stake,
  game,
  location,
  onPress,
}) => {
  return (
    <Pressable style={style.border} onPress={() => onPress()}>
      <View style={style.row}>
        <View>
          <View style={style.rowResult}>
            <Text style={style.textBlack}>
              {dateFormat(date, 'ddd mm-dd-yyyy')} -{' '}
            </Text>
            <Text style={style.textBlack}>{location}</Text>
          </View>
          <View style={style.rowResult}>
            <Text style={style.textBlack}>{gameType} - </Text>
            {minutes < 10 && (
              <Text style={style.textBlack}>
                {hours}:0{minutes}
              </Text>
            )}
            {minutes >= 10 && (
              <Text style={style.textBlack}>
                {hours}:{minutes}
              </Text>
            )}
          </View>
          <View style={style.rowResult}>
            {stake && <Text style={style.textBlack}>{stake} - </Text>}
            <Text style={style.textBlack}>{game} </Text>
          </View>
        </View>
        <View style={style.rowResult}>
          <View style={style.result}>
            {result > 0 && (
              <Text style={style.positiveColor}>${result.toFixed(2)}</Text>
            )}
            {result < 0 && (
              <Text style={style.negativeColor}>
                -${(result * -1).toFixed(2)}
              </Text>
            )}
            {result === 0 && <Text>${result.toFixed(2)}</Text>}
            <View style={style.chevron}>
              <FontAwesomeIcon
                style={style.chevronColor}
                icon={faChevronRight}
                size={12}
              />
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

SessionItem.propTypes = {
  onPress: PropTypes.func,
  result: PropTypes.number.isRequired,
  gameType: PropTypes.string.isRequired,
};

export default SessionItem;
