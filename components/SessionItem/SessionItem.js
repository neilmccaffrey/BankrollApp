import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './style';
import dateFormat from 'dateformat';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';

const SessionItem = ({result, gameType, date, hours, minutes}) => {
  return (
    <Pressable style={style.border}>
      <View style={style.row}>
        <View>
          <Text>{dateFormat(date, 'mm-dd-yyyy')}</Text>
          <View style={style.row}>
            <Text>{gameType} - </Text>
            {minutes < 10 && (
              <Text>
                {hours}:0{minutes}
              </Text>
            )}
            {minutes >= 10 && (
              <Text>
                {hours}:{minutes}
              </Text>
            )}
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

export default SessionItem;
