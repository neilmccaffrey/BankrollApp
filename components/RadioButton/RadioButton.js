import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import style from './style';

const RadioButton = ({isSelected, label, onPress}) => {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <View style={style.radioCircle}>
        {isSelected && <View style={style.selectedButton} />}
      </View>
      <Text style={style.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButton;
