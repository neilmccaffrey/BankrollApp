import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import style from './style';

const Input = ({
  label,
  placeholder,
  keyboardType,
  onChangeText,
  initialValue,
}) => {
  //set initialValue if updating session, empty when creating
  const [value, setValue] = useState(initialValue ? initialValue : '');

  return (
    <View style={style.inputContainer}>
      <Text style={style.label}>{label}</Text>
      <TextInput
        style={style.input}
        placeholder={placeholder}
        value={value}
        keyboardType={keyboardType}
        onChangeText={val => {
          setValue(val);
          onChangeText(val);
        }}
      />
      {value.includes('.') && (
        <Text style={style.error}>Only enter numbers</Text>
      )}
    </View>
  );
};

Input.defaultProps = {
  onChangeText: () => {},
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  onChangeText: PropTypes.func,
};

export default Input;
