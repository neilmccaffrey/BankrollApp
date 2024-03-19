import React from 'react';
import {Alert, Pressable, SafeAreaView, Text, View} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import style from './style';
import {useDispatch} from 'react-redux';
import {resetToInitialStateBankroll} from '../../redux/reducers/Bankroll';
import {resetToInitialStateGames} from '../../redux/reducers/Games';
import {resetToInitialStateLocations} from '../../redux/reducers/Locations';
import {resetToInitialStateSessions} from '../../redux/reducers/Sessions';
import {resetToInitialStateStakes} from '../../redux/reducers/Stakes';

const Info = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <View style={style.container}>
        <Pressable style={style.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon style={style.backButtonText} icon={faChevronLeft} />
        </Pressable>
        <View>
          <Pressable
            style={style.deleteContainer}
            onPress={() => {
              Alert.alert(
                'DELETE',
                'Are you sure you want to delete ALL data?',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      dispatch(resetToInitialStateBankroll());
                      dispatch(resetToInitialStateGames());
                      dispatch(resetToInitialStateLocations());
                      dispatch(resetToInitialStateSessions());
                      dispatch(resetToInitialStateStakes());
                    },
                  },
                  {
                    text: 'Cancel',
                    style: 'cancel',
                  },
                ],
              );
            }}>
            <View style={style.delete}>
              <FontAwesomeIcon
                icon={faExclamation}
                color={'#FF0000'}
                size={22}
              />
              <Text style={style.text}>Delete all data</Text>
            </View>
            <FontAwesomeIcon
              icon={faChevronRight}
              color={'#1DA1F2'}
              size={12}
            />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Info;
