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
  TouchableWithoutFeedback,
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
import {deleteSession, updateSession} from '../../redux/reducers/Sessions';

import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {addStake, deleteStake} from '../../redux/reducers/Stakes';
import {addGame, deleteGame} from '../../redux/reducers/Games';
import {SwipeListView} from 'react-native-swipe-list-view';
import {addLocation, deleteLocation} from '../../redux/reducers/Locations';

const UpdateSession = ({route, navigation}) => {
  const stakes = useSelector(state => state.stakes);
  const games = useSelector(state => state.games);
  const locations = useSelector(state => state.locations);
  const [value, setValue] = useState(route.params.gameType);
  const [buyIn, setBuyIn] = useState(route.params.buyIn);
  const [cashOut, setCashOut] = useState(route.params.cashOut);
  const [hours, setHours] = useState(route.params.hours);
  const [minutes, setMinutes] = useState(route.params.minutes);
  const [modalVisible, setModalVisible] = useState(false);
  const [stake, setStake] = useState(route.params.stake);
  const [customStake, setCustomStake] = useState('');
  const [modalGameVisible, setModalGameVisible] = useState(false);
  const [customGame, setCustomGame] = useState('');
  const [game, setGame] = useState(route.params.game);
  const [location, setLocation] = useState(route.params.location);
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
  const [date, setDate] = useState(new Date(route.params.date));
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
        <View style={style.pressablesContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <FontAwesomeIcon
              style={style.backButtonText}
              icon={faChevronLeft}
              size={20}
            />
          </Pressable>
          <Pressable
            style={style.delete}
            onPress={() => {
              Alert.alert('DELETE', 'Are you sure you want to delete?', [
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(deleteSession(route.params.sessionId));
                    dispatch(updateBankroll(buyIn - cashOut));
                    navigation.navigate(Routes.Home);
                  },
                },
                {
                  text: 'Cancel',
                  style: 'cancel',
                },
              ]);
            }}>
            <Text style={style.title}>Delete</Text>
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
              <View>
                <Input
                  initialValue={buyIn}
                  keyboardType={'number-pad'}
                  placeholder={'$0'}
                  label={'Buy-in:'}
                  onChangeText={val => setBuyIn(val)}
                />

                <Input
                  initialValue={cashOut}
                  keyboardType={'number-pad'}
                  placeholder={'$0'}
                  label={'Cash-out:'}
                  onChangeText={val => setCashOut(val)}
                />
              </View>
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
          title={'Update Session'}
          isDisabled={handleDisabled()}
          onPress={() => {
            //update bankroll with cashout amount minus buy-in amount
            dispatch(updateBankroll(cashOut - buyIn));
            dispatch(
              updateSession({
                result: cashOut - buyIn,
                sessionId: route.params.sessionId,
                gameType: value,
                date: date,
                hours: hours,
                minutes: minutes,
                buyIn: buyIn,
                cashOut: cashOut,
                stake: stake,
                location: location,
                game: game,
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
        <SafeAreaView style={style.containerModal}>
          <View style={style.buttonsModal}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={style.backButtonBigger}>
              <FontAwesomeIcon
                style={style.backButtonText}
                icon={faChevronLeft}
                size={20}
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
        </SafeAreaView>
      </Modal>
      {/* Modal for game */}
      <Modal
        visible={modalGameVisible}
        onRequestClose={() => setModalGameVisible(!modalGameVisible)}>
        <SafeAreaView style={style.containerModal}>
          <View style={style.buttonsModal}>
            <Pressable
              onPress={() => setModalGameVisible(!modalGameVisible)}
              style={style.backButtonBigger}>
              <FontAwesomeIcon
                style={style.backButtonText}
                icon={faChevronLeft}
                size={20}
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
        </SafeAreaView>
      </Modal>

      {/* Modal for location */}
      <Modal
        visible={modalLocationVisible}
        onRequestClose={() => setModalLocationVisible(!modalLocationVisible)}>
        <SafeAreaView style={style.containerModal}>
          <View style={style.buttonsModal}>
            <Pressable
              onPress={() => setModalLocationVisible(!modalLocationVisible)}
              style={style.backButtonBigger}>
              <FontAwesomeIcon
                style={style.backButtonText}
                icon={faChevronLeft}
                size={20}
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
                isDisabled={customLocation.length < 0}
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
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default UpdateSession;
