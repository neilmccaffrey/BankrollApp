import React, {useEffect, useState} from 'react';
import {Pressable, SafeAreaView, Text, View} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import style from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {useSelector} from 'react-redux';

const Stats = ({navigation}) => {
  const sessions = useSelector(state => state.session);
  const [profit, setProfit] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [hourlyRateCash, setHourlyRateCash] = useState(0);
  const [hourlyRateTournament, setHourlyRateTournament] = useState(0);
  const [winRateDenom, setWinRateDenom] = useState(0);
  const [count, setCount] = useState(0);
  const [overallPressed, setOverallPressed] = useState(true);
  const [cashPressed, setCashPressed] = useState(false);
  const [tournamentPressed, setTournamentPressed] = useState(false);

  useEffect(() => {
    //calculate profit/loss
    setProfit(
      sessions.sessions.reduce((sum, session) => sum + session.result, 0),
    );
    //calculate hours and minutes
    const addHours = sessions.sessions.reduce(
      (sum, session) => sum + Number(session.hours),
      0,
    );
    const minutesToHours = sessions.sessions.reduce(
      (sum, session) => sum + Number(session.minutes),
      0,
    );
    //truncate decimal places after hours
    setHours(Math.trunc(addHours + minutesToHours / 60));
    setMinutes(minutesToHours % 60);
    //calculate hourly rate
    setHourlyRate(profit / (hours + minutes / 60));

    let counter = 0;
    //calculate win rate
    sessions.sessions.map(session => {
      if (session.result > 0) {
        counter++;
      }
    });
    setCount(counter);
    // -1 for initial state
    setWinRateDenom(sessions.sessions.length - 1);
  }, [hourlyRate]);

  const handleOverall = () => {
    //calculate profit/loss
    setProfit(
      sessions.sessions.reduce((sum, session) => sum + session.result, 0),
    );

    //calculate hours and minutes
    const addHours = sessions.sessions.reduce(
      (sum, session) => sum + Number(session.hours),
      0,
    );
    const minutesToHours = sessions.sessions.reduce(
      (sum, session) => sum + Number(session.minutes),
      0,
    );
    //truncate decimal places after hours
    setHours(Math.trunc(addHours + minutesToHours / 60));
    setMinutes(minutesToHours % 60);

    //calculate hourly rate
    setHourlyRate(profit / (hours + minutes / 60));

    let counter = 0;
    //calculate win rate
    sessions.sessions.map(session => {
      if (session.result > 0) {
        counter++;
      }
    });
    setCount(counter);
    // -1 for initial state
    setWinRateDenom(sessions.sessions.length - 1);
  };

  const handleCash = () => {
    const cashSessions = sessions.sessions.filter(
      session => session.gameType === 'Cash game',
    );
    //calculate profit/loss
    const cashProfit = cashSessions.reduce(
      (sum, session) => sum + session.result,
      0,
    );

    setProfit(cashProfit);

    //calculate hours and minutes
    const addHours = cashSessions.reduce(
      (sum, session) => sum + Number(session.hours),
      0,
    );
    const minutesToHours = cashSessions.reduce(
      (sum, session) => sum + Number(session.minutes),
      0,
    );
    //truncate decimal places after hours
    setHours(Math.trunc(addHours + minutesToHours / 60));
    setMinutes(minutesToHours % 60);

    //calculate hourly rate
    setHourlyRateCash(cashProfit / (addHours + (minutesToHours % 60) / 60));

    let counter = 0;
    //calculate win rate
    cashSessions.map(session => {
      if (session.result > 0) {
        counter++;
      }
    });
    setCount(counter);
    setWinRateDenom(cashSessions.length);
  };

  const handleTournament = () => {
    const tournamentSessions = sessions.sessions.filter(
      session => session.gameType === 'Tournament',
    );
    //calculate profit/loss
    const tournamentProfit = tournamentSessions.reduce(
      (sum, session) => sum + session.result,
      0,
    );

    setProfit(tournamentProfit);

    //calculate hours and minutes
    const addHours = tournamentSessions.reduce(
      (sum, session) => sum + Number(session.hours),
      0,
    );
    const minutesToHours = tournamentSessions.reduce(
      (sum, session) => sum + Number(session.minutes),
      0,
    );
    //truncate decimal places after hours
    setHours(Math.trunc(addHours + minutesToHours / 60));
    setMinutes(minutesToHours % 60);

    //calculate hourly rate
    setHourlyRateTournament(
      tournamentProfit / (addHours + (minutesToHours % 60) / 60),
    );

    let counter = 0;
    //calculate win rate
    tournamentSessions.map(session => {
      if (session.result > 0) {
        counter++;
      }
    });
    setCount(counter);
    setWinRateDenom(tournamentSessions.length);
  };

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      <View style={style.container}>
        <Pressable style={style.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon style={style.backButtonText} icon={faChevronLeft} />
        </Pressable>
        {/* Set styles and call respective handlers depending on which button is active */}
        <View style={style.buttonContainer}>
          <Pressable
            style={
              overallPressed ? [style.buttons, style.isPressed] : style.buttons
            }
            onPress={() => {
              setOverallPressed(true);
              setCashPressed(false);
              setTournamentPressed(false);
              handleOverall();
            }}>
            <Text style={overallPressed ? style.textWhite : style.textBlack}>
              Overall
            </Text>
          </Pressable>
          <Pressable
            style={
              cashPressed ? [style.buttons, style.isPressed] : style.buttons
            }
            onPress={() => {
              setCashPressed(true);
              setOverallPressed(false);
              setTournamentPressed(false);
              handleCash();
            }}>
            <Text style={cashPressed ? style.textWhite : style.textBlack}>
              Cash Game
            </Text>
          </Pressable>
          <Pressable
            style={
              tournamentPressed
                ? [style.buttons, style.isPressed]
                : style.buttons
            }
            onPress={() => {
              setTournamentPressed(true);
              setCashPressed(false);
              setOverallPressed(false);
              handleTournament();
            }}>
            <Text style={tournamentPressed ? style.textWhite : style.textBlack}>
              Tournament
            </Text>
          </Pressable>
        </View>
        <View style={style.row}>
          <Text style={style.text}>Profit/Loss:</Text>
          {/* multiply negative number by -1 and add negative sign to front*/}
          {profit < 0 && (
            <Text style={style.textNeg}>-${(profit * -1).toFixed(2)}</Text>
          )}
          {profit > 0 && (
            <Text style={style.textPos}>${profit.toFixed(2)}</Text>
          )}
          {profit === 0 && <Text style={style.text}>${profit.toFixed(2)}</Text>}
        </View>
        <View style={style.row}>
          <Text style={style.text}>Duration:</Text>
          {minutes === 0 && (
            <Text style={style.text}>
              {hours}:{minutes}0
            </Text>
          )}
          {minutes > 0 && (
            <Text style={style.text}>
              {hours}:{minutes}
            </Text>
          )}
        </View>
        {/* render hourlyrate based on active button */}
        {overallPressed ? (
          <View style={style.row}>
            <Text style={style.text}>Hourly Rate:</Text>
            {/* multiply negative number by -1 and add negative sign to front*/}
            {hourlyRate < 0 && (
              <Text style={style.textNeg}>
                -${(hourlyRate * -1).toFixed(2)}
              </Text>
            )}
            {hourlyRate > 0 && (
              <Text style={style.textPos}>${hourlyRate.toFixed(2)}</Text>
            )}
            {hourlyRate === 0 && (
              <Text style={style.text}>${hourlyRate.toFixed(2)}</Text>
            )}
          </View>
        ) : (
          ''
        )}

        {cashPressed ? (
          <View style={style.row}>
            <Text style={style.text}>Hourly Rate:</Text>
            {/* multiply negative number by -1 and add negative sign to front*/}
            {hourlyRateCash < 0 && (
              <Text style={style.textNeg}>
                -${(hourlyRateCash * -1).toFixed(2)}
              </Text>
            )}
            {hourlyRateCash > 0 && (
              <Text style={style.textPos}>${hourlyRateCash.toFixed(2)}</Text>
            )}
            {hourlyRateCash === 0 && (
              <Text style={style.text}>${hourlyRateCash.toFixed(2)}</Text>
            )}
          </View>
        ) : (
          ''
        )}

        {tournamentPressed ? (
          <View style={style.row}>
            <Text style={style.text}>Hourly Rate:</Text>
            {/* multiply negative number by -1 and add negative sign to front*/}
            {hourlyRateTournament < 0 && (
              <Text style={style.textNeg}>
                -${(hourlyRateTournament * -1).toFixed(2)}
              </Text>
            )}
            {hourlyRateCash > 0 && (
              <Text style={style.textPos}>
                ${hourlyRateTournament.toFixed(2)}
              </Text>
            )}
            {hourlyRateCash === 0 && (
              <Text style={style.text}>${hourlyRateTournament.toFixed(2)}</Text>
            )}
          </View>
        ) : (
          ''
        )}

        <View style={style.row}>
          <Text style={style.text}>Win Rate:</Text>
          {sessions.sessions.length > 1 && (
            <Text style={style.text}>
              {count}/{winRateDenom} ({Math.round((count / winRateDenom) * 100)}
              %)
            </Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Stats;
