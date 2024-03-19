import React from 'react';
import {Pressable, Text, View} from 'react-native';
import style from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChartColumn,
  faChartLine,
  faCircleInfo,
} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../navigation/Routes';

const Footer = ({navigation}) => {
  return (
    <View style={style.container}>
      <Pressable
        style={style.button}
        onPress={() => navigation.navigate(Routes.Stats)}>
        <View style={style.col}>
          <FontAwesomeIcon icon={faChartLine} size={30} color={'#1DA1F2'} />
          <Text>Stats</Text>
        </View>
      </Pressable>
      <Pressable
        style={style.button}
        onPress={() => navigation.navigate(Routes.Graphs)}>
        <View style={style.col}>
          <FontAwesomeIcon icon={faChartColumn} size={30} color={'#1DA1F2'} />
          <Text>Graphs</Text>
        </View>
      </Pressable>
      <Pressable
        style={style.buttonEnd}
        onPress={() => navigation.navigate(Routes.Info)}>
        <View style={style.col}>
          <FontAwesomeIcon icon={faCircleInfo} size={30} color={'#1DA1F2'} />
          <Text>Info</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Footer;
