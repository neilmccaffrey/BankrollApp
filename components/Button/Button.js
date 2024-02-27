import React from 'react';
import {Pressable, Text} from 'react-native';
import PropTypes from 'prop-types';
import style from './style';

const Button = ({title, onPress, isDisabled, biggerButton}) => {
  return (
    <Pressable
      style={[
        style.button,
        isDisabled && style.disabled,
        biggerButton && style.biggerButton,
      ]}
      disabled={isDisabled}
      onPress={() => onPress()}>
      <Text style={style.title}>{title}</Text>
    </Pressable>
  );
};

Button.defaultProps = {
  isDisabled: true,
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  isDisabled: PropTypes.bool,
};

export default Button;
