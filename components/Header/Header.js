import React, {useState} from 'react';
import Button from '../Button/Button';
import {Modal, Text, TouchableWithoutFeedback, View} from 'react-native';
import style from './style';
import {Routes} from '../../navigation/Routes';
import {useDispatch, useSelector} from 'react-redux';
import {
  bankrollDeposit,
  bankrollWithdrawal,
} from '../../redux/reducers/Bankroll';
import Input from '../Input/Input';

const Header = ({navigation}) => {
  const [depositModal, setDepositModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawlModal, setWithdrawalModal] = useState(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  //get bankroll amount
  const bankrollAmount = useSelector(state => state.bankroll.bankrollAmount);

  const dispatch = useDispatch();

  return (
    <View style={style.headerContainer}>
      <View style={style.bankrollContainer}>
        <Text style={style.brText}>Bankroll: </Text>
        <View>
          {/* multiply negative number by -1 and add negative sign to front*/}
          {bankrollAmount < 0 && (
            <Text style={style.bankRollNegativeColor}>
              -${(bankrollAmount * -1).toFixed(2)}
            </Text>
          )}
          {bankrollAmount > 0 && (
            <Text style={style.bankrollPositiveColor}>
              ${bankrollAmount.toFixed(2)}
            </Text>
          )}
          {bankrollAmount === 0 && (
            <Text style={style.brText}>${bankrollAmount.toFixed(2)}</Text>
          )}
        </View>
      </View>
      <View style={style.button}>
        <Button
          title={'Deposit'}
          isDisabled={false}
          onPress={() => setDepositModal(true)}
        />
        <Button
          title={'Withdraw'}
          isDisabled={false}
          onPress={() => setWithdrawalModal(true)}
        />
        <Button
          title={'+ Add Session'}
          isDisabled={false}
          onPress={() => navigation.navigate(Routes.Session)}
        />
      </View>
      {/* Deposit Modal*/}
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={depositModal}
        onRequestClose={() => setDepositModal(!depositModal)}>
        <TouchableWithoutFeedback
          onPress={() => setDepositModal(!depositModal)}>
          <View style={style.centerView}>
            <TouchableWithoutFeedback>
              <View style={style.modalView}>
                <Input
                  label={'Deposit Amount: '}
                  keyboardType={'number-pad'}
                  onChangeText={val => setDepositAmount(val)}
                />
                <Button
                  title={'Confirm'}
                  isDisabled={false}
                  onPress={() => {
                    dispatch(bankrollDeposit(Number(depositAmount)));
                    setDepositModal(!depositModal);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {/* Withdrawal Modal */}
      <Modal
        transparent={true}
        animationType={'slide'}
        visible={withdrawlModal}
        onRequestClose={() => setWithdrawalModal(!withdrawlModal)}>
        <TouchableWithoutFeedback
          onPress={() => setWithdrawalModal(!withdrawlModal)}>
          <View style={style.centerView}>
            <TouchableWithoutFeedback>
              <View style={style.modalView}>
                <Input
                  label={'Withdrawal Amount: '}
                  keyboardType={'number-pad'}
                  onChangeText={val => setWithdrawalAmount(val)}
                />
                <Button
                  title={'Confirm'}
                  isDisabled={false}
                  onPress={() => {
                    dispatch(bankrollWithdrawal(Number(withdrawalAmount)));
                    setWithdrawalModal(!withdrawlModal);
                  }}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default Header;
