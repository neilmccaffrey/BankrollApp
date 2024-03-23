import React, {useEffect, useState} from 'react';
import {
  Alert,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Routes} from '../../navigation/Routes';

import globalStyle from '../../styles/globalStyle';
import style from './style';

import {Dropdown} from 'react-native-element-dropdown';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {useDispatch, useSelector} from 'react-redux';
import {updateBankroll} from '../../redux/reducers/Bankroll';
import {addSession} from '../../redux/reducers/Sessions';

import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {addStake, deleteStake} from '../../redux/reducers/Stakes';
import {addGame, deleteGame} from '../../redux/reducers/Games';
import {SwipeListView} from 'react-native-swipe-list-view';
import {addLocation, deleteLocation} from '../../redux/reducers/Locations';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const Session = ({navigation}) => {
  const sessions = useSelector(state => state.session);
  const stakes = useSelector(state => state.stakes);
  const games = useSelector(state => state.games);
  const locations = useSelector(state => state.locations);
  const [value, setValue] = useState(sessions.sessions[0].gameType);
  const [buyIn, setBuyIn] = useState('');
  const [cashOut, setCashOut] = useState('');
  const [hours, setHours] = useState('8');
  const [minutes, setMinutes] = useState('0');
  const [modalVisible, setModalVisible] = useState(false);
  //set the initial state to the last stake used
  const [stake, setStake] = useState(sessions.sessions[0].stake);
  const [customStake, setCustomStake] = useState('');
  const [modalGameVisible, setModalGameVisible] = useState(false);
  const [customGame, setCustomGame] = useState('');
  const [game, setGame] = useState(sessions.sessions[0].game);
  const [location, setLocation] = useState(sessions.sessions[0].location);
  const [customLocation, setCustomLocation] = useState('');
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  //set stake to empty string if not cash game
  useEffect(() => {
    if (value === 'Tournament') {
      setStake('');
    }

    const keyboardWillShowListener = Keyboard.addListener(
      'keyboardWillShow',
      () => setKeyboardVisible(true),
    );
    const keyboardWillHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => setKeyboardVisible(false),
    );
    return () => {
      keyboardWillShowListener.remove();
      keyboardWillHideListener.remove();
    };
  }, [stake, value]);

  const dispatch = useDispatch();

  //date picker
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  //duration picker
  const [openDuration, setOpenDuration] = useState(false);

  const data = [
    {label: 'Cash game', value: 'Cash game'},
    {label: 'Tournament', value: 'Tournament'},
  ];

  //disable save session button if fields are empty/incorrect
  const handleDisabled = () => {
    if (
      !buyIn ||
      !cashOut ||
      isNaN(buyIn) ||
      isNaN(cashOut) ||
      buyIn.includes('.') ||
      cashOut.includes('.')
    ) {
      return true;
    }
    return false;
  };

  //set hours and minutes values for duration on confirm of picker
  const handlePicker = val => {
    setHours(val.getHours());
    setMinutes(val.getMinutes());
    setOpenDuration(false);
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <View style={style.container}>
        <View>
          <Pressable
            style={style.backButton}
            onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={style.backButtonText}
              icon={faChevronLeft}
            />
          </Pressable>
        </View>
        <View style={style.dropdownContainer}>
          <Text style={style.textColor}>Select game type:</Text>
          <View style={style.dropdown}>
            <Dropdown
              data={data}
              labelField={'label'}
              valueField={'value'}
              value={value}
              itemTextStyle={style.textColor}
              selectedTextStyle={style.textColor}
              onChange={item => {
                setValue(item.value);
              }}
            />
          </View>
        </View>
        <View style={style.pressablesContainer}>
          <Pressable style={style.press} onPress={() => setOpen(true)}>
            <Text style={style.textColor}>{'Date'}</Text>
            <FontAwesomeIcon icon={faChevronRight} size={12} />
          </Pressable>
          <Pressable onPress={() => setOpen(true)}>
            <Text style={[style.textColor, style.dateSize]}>
              {date.toDateString()}
            </Text>
          </Pressable>
          <DatePicker
            modal
            open={open}
            mode={'date'}
            date={date}
            onConfirm={val => {
              setOpen(false);
              setDate(val);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </View>
        <View style={style.pressablesContainer}>
          <Pressable style={style.press} onPress={() => setOpenDuration(true)}>
            <Text style={style.textColor}>{'Duration'}</Text>
            <FontAwesomeIcon icon={faChevronRight} size={12} />
          </Pressable>
          <Pressable onPress={() => setOpenDuration(true)}>
            <Text style={[style.textColor, style.dateSize]}>
              {minutes < 10
                ? `${hours} : 0${minutes}`
                : `${hours} : ${minutes}`}
            </Text>
          </Pressable>
          <DateTimePickerModal
            isVisible={openDuration}
            mode={'time'}
            is24Hour={true}
            display={'spinner'}
            date={new Date(new Date().setHours(8, 0, 0, 0))}
            onConfirm={handlePicker}
            onCancel={() => setOpenDuration(false)}
            locale={'en_GB'}
          />
        </View>
        <View style={style.pressablesContainer}>
          <Pressable
            style={style.press}
            onPress={() => setModalGameVisible(true)}>
            <Text style={style.textColor}>{'Game'}</Text>
            <FontAwesomeIcon icon={faChevronRight} size={12} />
          </Pressable>
          <Pressable onPress={() => setModalGameVisible(true)}>
            <Text style={[style.textColor, style.dateSize]}>{game}</Text>
          </Pressable>
        </View>
        <View style={style.pressablesContainer}>
          <Pressable
            style={style.press}
            onPress={() => setModalLocationVisible(true)}>
            <Text style={style.textColor}>{'Location'}</Text>
            <FontAwesomeIcon icon={faChevronRight} size={12} />
          </Pressable>
          <Pressable onPress={() => setModalLocationVisible(true)}>
            <Text style={[style.textColor, style.dateSize]}>{location}</Text>
          </Pressable>
        </View>
        {value === 'Cash game' && (
          <View style={style.pressablesContainer}>
            <Pressable
              style={style.press}
              onPress={() => setModalVisible(true)}>
              <Text style={style.textColor}>{'Stake'}</Text>
              <FontAwesomeIcon icon={faChevronRight} size={12} />
            </Pressable>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={[style.textColor, style.dateSize]}>{stake}</Text>
            </Pressable>
          </View>
        )}

        {Platform.OS === 'ios' && (
          <View>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
              <>
                <Input
                  keyboardType={'number-pad'}
                  placeholder={'$0'}
                  label={'Buy-in:'}
                  onChangeText={val => setBuyIn(val)}
                />

                <Input
                  keyboardType={'number-pad'}
                  placeholder={'$0'}
                  label={'Cash-out:'}
                  onChangeText={val => setCashOut(val)}
                />
              </>
            </TouchableWithoutFeedback>
            {keyboardVisible && (
              <Pressable
                style={style.doneButton}
                onPress={() => Keyboard.dismiss()}>
                <Text style={style.doneText}>Done</Text>
              </Pressable>
            )}
          </View>
        )}
        {Platform.OS === 'android' && (
          <View>
            <Input
              keyboardType={'number-pad'}
              placeholder={'$0'}
              label={'Buy-in:'}
              onChangeText={val => setBuyIn(val)}
            />

            <Input
              keyboardType={'number-pad'}
              placeholder={'$0'}
              label={'Cash-out:'}
              onChangeText={val => setCashOut(val)}
            />
          </View>
        )}
        {Platform.OS === 'ios' && (
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={style.emptySpace} />
          </TouchableWithoutFeedback>
        )}
      </View>

      <View style={style.button}>
        <Button
          title={'Save Session'}
          isDisabled={handleDisabled()}
          onPress={() => {
            //update bankroll with cashout amount minus buy-in amount
            dispatch(updateBankroll(cashOut - buyIn));
            dispatch(
              addSession({
                result: cashOut - buyIn,
                //use uuid to generate session id for edit/delete
                sessionId: uuid.v4(),
                gameType: value,
                date: date,
                hours: hours,
                minutes: minutes,
                buyIn: buyIn,
                cashOut: cashOut,
                stake: stake,
                game: game,
                location: location,
              }),
            );
            navigation.navigate(Routes.Home);
          }}
          biggerButton={true}
        />
      </View>

      {/* Modal for stakes */}
      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={style.containerModal}>
          <View style={style.buttonsModal}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <FontAwesomeIcon
                style={style.backButtonText}
                icon={faChevronLeft}
              />
            </Pressable>
            <View style={style.inputContainer}>
              <TextInput
                style={style.input}
                value={customStake}
                placeholder={'custom'}
                onChangeText={val => setCustomStake(val)}
              />
              <Button
                title={'+ Add Stake'}
                isDisabled={customStake.length < 1}
                onPress={() => {
                  dispatch(addStake(customStake));
                  setCustomStake('');
                }}
              />
            </View>
          </View>
          <SwipeListView
            useFlatList={true}
            data={stakes}
            renderItem={({item}) => {
              return (
                <Pressable
                  style={style.stakesContainer}
                  onPress={() => {
                    setStake(item);
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={style.textColor}>{item}</Text>
                  <View style={style.chevron}>
                    <FontAwesomeIcon
                      style={style.chevronColor}
                      icon={faChevronRight}
                      size={12}
                    />
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={index => index.toString()}
            renderHiddenItem={item => (
              <View style={style.hidden}>
                <TouchableOpacity
                  style={style.backRightButton}
                  onPress={() => {
                    Alert.alert('DELETE', 'Are you sure you want to delete?', [
                      {
                        text: 'OK',
                        onPress: () => {
                          dispatch(deleteStake(item.item));
                        },
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                    ]);
                  }}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    color={'white'}
                    size={20}
                  />
                  <Text style={style.textColorTrash}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
          />
        </View>
      </Modal>
      {/* Modal for game */}
      <Modal
        visible={modalGameVisible}
        onRequestClose={() => setModalGameVisible(!modalGameVisible)}>
        <View style={style.containerModal}>
          <View style={style.buttonsModal}>
            <Pressable onPress={() => setModalGameVisible(!modalGameVisible)}>
              <FontAwesomeIcon
                style={style.backButtonText}
                icon={faChevronLeft}
              />
            </Pressable>
            <View style={style.inputContainer}>
              <TextInput
                style={style.input}
                value={customGame}
                placeholder={'custom'}
                onChangeText={val => setCustomGame(val)}
              />
              <Button
                title={'+ Add Game'}
                isDisabled={customGame.length < 1}
                onPress={() => {
                  dispatch(addGame(customGame));
                  setCustomGame('');
                }}
              />
            </View>
          </View>
          <SwipeListView
            useFlatList={true}
            data={games}
            renderItem={({item}) => {
              return (
                <Pressable
                  style={style.stakesContainer}
                  onPress={() => {
                    setGame(item);
                    setModalGameVisible(!modalGameVisible);
                  }}>
                  <Text style={style.textColor}>{item}</Text>
                  <View style={style.chevron}>
                    <FontAwesomeIcon
                      style={style.chevronColor}
                      icon={faChevronRight}
                      size={12}
                    />
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={index => index.toString()}
            renderHiddenItem={item => (
              <View style={style.hidden}>
                <TouchableOpacity
                  style={style.backRightButton}
                  onPress={() => {
                    Alert.alert('DELETE', 'Are you sure you want to delete?', [
                      {
                        text: 'OK',
                        onPress: () => {
                          dispatch(deleteGame(item.item));
                        },
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                    ]);
                  }}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    color={'white'}
                    size={20}
                  />
                  <Text style={style.textColorTrash}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
          />
        </View>
      </Modal>

      {/* Modal for location */}
      <Modal
        visible={modalLocationVisible}
        onRequestClose={() => setModalLocationVisible(!modalLocationVisible)}>
        <View style={style.containerModal}>
          <View style={style.buttonsModal}>
            <Pressable
              onPress={() => setModalLocationVisible(!modalLocationVisible)}>
              <FontAwesomeIcon
                style={style.backButtonText}
                icon={faChevronLeft}
              />
            </Pressable>
            <View style={style.inputContainer}>
              <TextInput
                style={style.input}
                value={customLocation}
                placeholder={'location'}
                onChangeText={val => setCustomLocation(val)}
              />
              <Button
                title={'+ Add Location'}
                isDisabled={customLocation.length < 1}
                onPress={() => {
                  dispatch(addLocation(customLocation));
                  setCustomLocation('');
                }}
              />
            </View>
          </View>
          <SwipeListView
            useFlatList={true}
            data={locations}
            renderItem={({item}) => {
              return (
                <Pressable
                  style={style.stakesContainer}
                  onPress={() => {
                    setLocation(item);
                    setModalLocationVisible(!modalLocationVisible);
                  }}>
                  <Text style={style.textColor}>{item}</Text>
                  <View style={style.chevron}>
                    <FontAwesomeIcon
                      style={style.chevronColor}
                      icon={faChevronRight}
                      size={12}
                    />
                  </View>
                </Pressable>
              );
            }}
            keyExtractor={index => index.toString()}
            renderHiddenItem={item => (
              <View style={style.hidden}>
                <TouchableOpacity
                  style={style.backRightButton}
                  onPress={() => {
                    Alert.alert('DELETE', 'Are you sure you want to delete?', [
                      {
                        text: 'OK',
                        onPress: () => {
                          dispatch(deleteLocation(item.item));
                        },
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel',
                      },
                    ]);
                  }}>
                  <FontAwesomeIcon
                    icon={faTrashCan}
                    color={'white'}
                    size={20}
                  />
                  <Text style={style.textColorTrash}>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
            rightOpenValue={-75}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Session;
