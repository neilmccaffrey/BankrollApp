import React, {useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import {Routes} from '../../navigation/Routes';

import globalStyle from '../../styles/globalStyle';
import style from './style';

import {Dropdown} from 'react-native-element-dropdown';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

import {useDispatch} from 'react-redux';
import {updateBankroll} from '../../redux/reducers/Bankroll';
import {addSession} from '../../redux/reducers/Sessions';

import uuid from 'react-native-uuid';
import DatePicker from 'react-native-date-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronRight} from '@fortawesome/free-solid-svg-icons';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Session = ({navigation}) => {
  const [value, setValue] = useState('Cash game');
  const [buyIn, setBuyIn] = useState('');
  const [cashOut, setCashOut] = useState('');
  const [hours, setHours] = useState('8');
  const [minutes, setMinutes] = useState('0');
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
          <View style={style.dropdownContainer}>
            <Text style={style.textColor}>Select game type</Text>
            <View style={style.dropdown}>
              <Dropdown
                data={data}
                labelField={'label'}
                valueField={'value'}
                value={value}
                onChange={item => {
                  setValue(item.value);
                }}
              />
            </View>
          </View>
          <View style={style.dateContainer}>
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
          <View style={style.dateContainer}>
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
          <View>
            <Input
              keyboardType={'number-pad'}
              placeholder={'$0'}
              label={'Buy-in'}
              onChangeText={val => setBuyIn(val)}
            />
          </View>
          <View>
            <Input
              keyboardType={'number-pad'}
              placeholder={'$0'}
              label={'Cash out'}
              onChangeText={val => setCashOut(val)}
            />
          </View>
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

export default Session;
