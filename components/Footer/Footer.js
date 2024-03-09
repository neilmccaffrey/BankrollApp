import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChartColumn, faChartLine} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../navigation/Routes';

const Footer = ({navigation}) => {
  return (
    <View style={style.container}>
      <Pressable
        style={style.button}
        onPress={() => navigation.navigate(Routes.Stats)}>
        <FontAwesomeIcon icon={faChartLine} size={30} color={'#1DA1F2'} />
        <Text>Stats</Text>
      </Pressable>
      <Pressable
        style={style.button}
        onPress={() => navigation.navigate(Routes.Graphs)}>
        <FontAwesomeIcon icon={faChartColumn} size={30} color={'#1DA1F2'} />
        <Text>Graphs</Text>
      </Pressable>
    </View>
  );
};

export default Footer;
