import React, {useState} from 'react';
import {Alert, Pressable, SafeAreaView, Text, View} from 'react-native';
import {Routes} from '../../navigation/Routes';

import globalStyle from '../../styles/globalStyle';
import style from './style';

import {Dropdown} from 'react-native-element-dropdown';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {useDispatch} from 'react-redux';
import {updateBankroll} from '../../redux/reducers/Bankroll';
import {deleteSession, updateSession} from '../../redux/reducers/Sessions';

import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const UpdateSession = ({route, navigation}) => {
  const [value, setValue] = useState(route.params.gameType);
  const [buyIn, setBuyIn] = useState(route.params.buyIn);
  const [cashOut, setCashOut] = useState(route.params.cashOut);
  const [hours, setHours] = useState(route.params.hours);
  const [minutes, setMinutes] = useState(route.params.minutes);
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
        <View>
          <View style={style.pressablesContainer}>
            <Pressable
              style={style.backButton}
              onPress={() => navigation.goBack()}>
              <FontAwesomeIcon
                style={style.backButtonText}
                icon={faChevronLeft}
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
              <Text style={style.textColor}>{'Select date '}</Text>
              <FontAwesomeIcon icon={faChevronRight} size={12} />
            </Pressable>
            <Text style={[style.textColor, style.dateSize]}>
              {date.toDateString()}
            </Text>
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
            <Pressable
              style={style.press}
              onPress={() => setOpenDuration(true)}>
              <Text style={style.textColor}>{'Duration      '}</Text>
              <FontAwesomeIcon icon={faChevronRight} size={12} />
            </Pressable>
            <Text style={[style.textColor, style.dateSize]}>
              {minutes < 10
                ? `${hours} : 0${minutes}`
                : `${hours} : ${minutes}`}
            </Text>
            <DateTimePickerModal
              isVisible={openDuration}
              mode={'time'}
              date={new Date(new Date().setHours(8, 0, 0, 0))}
              onConfirm={handlePicker}
              onCancel={() => setOpenDuration(false)}
              locale={'en_GB'}
            />
          </View>
          {value === 'Cash game' && (
            <View style={style.pressablesContainer}>
              <Pressable style={style.press}>
                <Text style={style.textColor}>{'Stake           '}</Text>
                <FontAwesomeIcon icon={faChevronRight} size={12} />
              </Pressable>
              <Text style={[style.textColor, style.dateSize]}>{'2/5'}</Text>
            </View>
          )}
          <View>
            <Input
              keyboardType={'number-pad'}
              initialValue={buyIn}
              label={'Buy-in:'}
              onChangeText={val => setBuyIn(val)}
            />
          </View>
          <View>
            <Input
              keyboardType={'number-pad'}
              initialValue={cashOut}
              label={'Cash out:'}
              onChangeText={val => setCashOut(val)}
            />
          </View>
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
                }),
              );
              navigation.navigate(Routes.Home);
            }}
            biggerButton={true}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UpdateSession;
