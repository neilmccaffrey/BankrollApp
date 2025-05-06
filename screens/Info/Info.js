import React from 'react';
import {
  Alert,
  Linking,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faExclamation,
} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-regular-svg-icons';
import style from './style';
import {useDispatch} from 'react-redux';
import {resetToInitialStateBankroll} from '../../redux/reducers/Bankroll';
import {resetToInitialStateGames} from '../../redux/reducers/Games';
import {resetToInitialStateLocations} from '../../redux/reducers/Locations';
import {resetToInitialStateSessions} from '../../redux/reducers/Sessions';
import {resetToInitialStateStakes} from '../../redux/reducers/Stakes';
import {faXTwitter} from '@fortawesome/free-brands-svg-icons';

const openXProfile = async username => {
  const url = `twitter://user?screen_name=${username}`;
  const fallbackUrl = `https://twitter.com/${username}`;

  //check if X app can be opened
  const canOpen = await Linking.canOpenURL(url);

  if (canOpen) {
    //open x app
    await Linking.openURL(url);
  } else {
    //fallback open in web browser
    await Linking.openURL(fallbackUrl);
  }
};

const sendEmail = () => {
  const email = 'pokerstatisticsmobile@gmail.com';
  const subject = encodeURIComponent('PokerStatisics App');
  const mailtoURL = `mailto:${email}?subject=${subject}`;

  Linking.openURL(mailtoURL)
    .then(data => {
      console.log('Mailto message sent', data);
    })
    .catch(err => {
      console.warn('Error sending mailto email', err);
    });
};

const Info = ({navigation}) => {
  const dispatch = useDispatch();
  return (
    <SafeAreaView
      style={[globalStyle.backgroundWhite, globalStyle.flex, style.justify]}>
      <View style={style.container}>
        <Pressable style={style.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon
            style={style.backButtonText}
            icon={faChevronLeft}
            size={20}
          />
        </Pressable>
        <View>
          <Pressable
            style={style.buttonContainer}
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
            <View style={style.buttonItems}>
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
        <View style={style.supportContainer}>
          <Text style={style.supportText}>Support</Text>
        </View>
        <Pressable
          style={style.buttonContainer}
          onPress={() => {
            openXProfile('pokerstatsapp');
          }}>
          <View style={style.buttonItems}>
            <FontAwesomeIcon icon={faXTwitter} size={22} />
            <Text style={style.text}>@PokerStatsApp</Text>
          </View>
          <FontAwesomeIcon icon={faChevronRight} color={'#1DA1F2'} size={12} />
        </Pressable>
        <Pressable
          style={style.buttonContainer}
          onPress={() => {
            sendEmail();
          }}>
          <View style={style.buttonItems}>
            <FontAwesomeIcon icon={faEnvelope} size={22} />
            <Text style={style.text}>pokerstatisticsmobile@gmail.com</Text>
          </View>
          <FontAwesomeIcon icon={faChevronRight} color={'#1DA1F2'} size={12} />
        </Pressable>
      </View>
      <Text style={style.tyText}>
        This is the first version of the PokerStatistics App. I have a lot of
        ideas to implement with future updates. Please feel free to contact me
        through X or Email with any questions, comments, or bug reports. Thank
        you, and best of luck at the tables!
      </Text>
    </SafeAreaView>
  );
};

export default Info;
