import React, {useEffect, useState} from 'react';
import {
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import style from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {useDispatch, useSelector} from 'react-redux';
import DatePicker from 'react-native-date-picker';
import {deleteLocation} from '../../redux/reducers/Locations';
import {SwipeListView} from 'react-native-swipe-list-view';
import {deleteGame} from '../../redux/reducers/Games';
import {deleteStake} from '../../redux/reducers/Stakes';
import Button from '../../components/Button/Button';

const Stats = ({navigation}) => {
  const sessions = useSelector(state => state.session);
  const [profit, setProfit] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hourlyRate, setHourlyRate] = useState(0);
  const [winRateDenom, setWinRateDenom] = useState(0);
  const [count, setCount] = useState(0);

  const stakes = useSelector(state => state.stakes);
  const games = useSelector(state => state.games);
  const locations = useSelector(state => state.locations);

  const [overallPressed, setOverallPressed] = useState(true);
  const [cashPressed, setCashPressed] = useState(false);
  const [tournamentPressed, setTournamentPressed] = useState(false);
  const [stakeFilter, setStakeFilter] = useState(false);
  const [gameFilter, setGameFilter] = useState(false);
  const [locationFilter, setLocationFilter] = useState(false);
  const [dateFromFilter, setDateFromFilter] = useState(false);
  const [dateToFilter, setDateToFilter] = useState(false);

  //modal stakes
  const [modalVisible, setModalVisible] = useState(false);
  const [stake, setStake] = useState('');
  //modal games
  const [modalGameVisible, setModalGameVisible] = useState(false);
  const [game, setGame] = useState('');
  //modal location
  const [modalLocationVisible, setModalLocationVisible] = useState(false);
  const [location, setLocation] = useState('');
  //date modals
  const [openDateFrom, setOpenDateFrom] = useState(false);
  const [dateFrom, setDateFrom] = useState(null);
  const [openDateTo, setOpenDateTo] = useState(false);
  const [dateTo, setDateTo] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    let filteredArr = sessions.sessions.filter(item => item.sessionId !== '1');
    let counter = 0;
    let addHours = 0;
    let minutesToHours = 0;

    if (cashPressed) {
      filteredArr = filteredArr.filter(
        session => session.gameType === 'Cash game',
      );
    }
    if (tournamentPressed) {
      filteredArr = filteredArr.filter(
        session => session.gameType === 'Tournament',
      );
    }
    if (stakeFilter) {
      filteredArr = filteredArr.filter(session => session.stake === stake);
      //if no results set stake to no results message
      if (filteredArr.length === 0) {
        setStake('No results');
      }
    }
    if (gameFilter) {
      filteredArr = filteredArr.filter(session => session.game === game);
      //if no results set game to no results message
      if (filteredArr.length === 0) {
        setGame('No results');
      }
    }

    if (locationFilter) {
      filteredArr = filteredArr.filter(
        session => session.location === location,
      );
      //if no results set location to no results message
      if (filteredArr.length === 0) {
        setLocation('No results');
      }
    }

    if (dateFromFilter) {
      filteredArr = filteredArr.filter(
        session => new Date(session.date) >= new Date(dateFrom),
      );

      if (filteredArr.length === 0) {
        //if no results set date from to no results message
        setDateFrom(null);
      }
    }

    if (dateToFilter) {
      filteredArr = filteredArr.filter(
        session => new Date(session.date) <= new Date(dateTo),
      );

      if (filteredArr.length === 0) {
        //if no results set date from to no results message
        setDateTo(null);
      }
    }

    //calculate profit/loss
    setProfit(filteredArr.reduce((sum, session) => sum + session.result, 0));
    //calculate hours and minutes
    addHours = filteredArr.reduce(
      (sum, session) => sum + Number(session.hours),
      0,
    );
    minutesToHours = filteredArr.reduce(
      (sum, session) => sum + Number(session.minutes),
      0,
    );
    //truncate decimal places after hours
    setHours(Math.trunc(addHours + minutesToHours / 60));
    setMinutes(minutesToHours % 60);
    //calculate hourly rate
    setHourlyRate(profit / (hours + minutes / 60));

    //calculate win rate
    filteredArr.map(session => {
      if (session.result > 0) {
        counter++;
      }
    });
    setCount(counter);
    setWinRateDenom(filteredArr.length);
  }, [
    overallPressed,
    cashPressed,
    tournamentPressed,
    hourlyRate,
    profit,
    stake,
    stakeFilter,
    game,
    gameFilter,
    location,
    locationFilter,
    dateFrom,
    dateFromFilter,
    dateTo,
    dateToFilter,
  ]);

  return (
    <SafeAreaView
      style={[globalStyle.backgroundWhite, globalStyle.flex, style.justify]}>
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
              setStakeFilter(false);
              setStake('');
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
              setStakeFilter(false);
              setStake('');
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

        {tournamentPressed ? (
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

        <View style={style.row}>
          <Text style={style.text}>Win Rate:</Text>
          {winRateDenom > 0 && (
            <Text style={style.text}>
              {count}/{winRateDenom} ({Math.round((count / winRateDenom) * 100)}
              %)
            </Text>
          )}
        </View>
        <Text style={style.textColor}>Filters:</Text>

        <View style={style.filtersContainer}>
          {cashPressed && (
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

          <View style={style.pressablesContainer}>
            <Pressable
              style={style.press}
              onPress={() => setOpenDateFrom(true)}>
              <Text style={style.textColor}>{'Date From'}</Text>
              <FontAwesomeIcon icon={faChevronRight} size={12} />
            </Pressable>
            <Pressable onPress={() => setOpenDateFrom(true)}>
              <Text style={[style.textColor, style.dateSize]}>
                {dateFrom === null ? 'Select Date' : dateFrom.toDateString()}
              </Text>
            </Pressable>
            <DatePicker
              modal
              open={openDateFrom}
              mode={'date'}
              date={dateFrom || new Date()}
              onConfirm={val => {
                setOpenDateFrom(false);
                setDateFrom(val);
                setDateFromFilter(true);
              }}
              onCancel={() => {
                setOpenDateFrom(false);
              }}
            />
          </View>
          <View style={style.pressablesContainer}>
            <Pressable style={style.press} onPress={() => setOpenDateTo(true)}>
              <Text style={style.textColor}>{'Date To'}</Text>
              <FontAwesomeIcon icon={faChevronRight} size={12} />
            </Pressable>
            <Pressable onPress={() => setOpenDateTo(true)}>
              <Text style={[style.textColor, style.dateSize]}>
                {dateTo === null ? 'Select Date' : dateTo.toDateString()}
              </Text>
            </Pressable>
            <DatePicker
              modal
              open={openDateTo}
              mode={'date'}
              date={dateTo || new Date()}
              onConfirm={val => {
                setOpenDateTo(false);
                setDateTo(val);
                setDateToFilter(true);
              }}
              onCancel={() => {
                setOpenDateTo(false);
              }}
            />
          </View>
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
                      setStakeFilter(true);
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
                      Alert.alert(
                        'DELETE',
                        'Are you sure you want to delete?',
                        [
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
                        ],
                      );
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
                      setGameFilter(true);
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
                      Alert.alert(
                        'DELETE',
                        'Are you sure you want to delete?',
                        [
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
                        ],
                      );
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
                      setLocationFilter(true);
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
                      Alert.alert(
                        'DELETE',
                        'Are you sure you want to delete?',
                        [
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
                        ],
                      );
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
      </View>
      <View style={style.clearButton}>
        <Button
          title={'Clear filters'}
          isDisabled={false}
          onPress={() => {
            setOverallPressed(true);
            setTournamentPressed(false);
            setCashPressed(false);
            setStakeFilter(false);
            setGameFilter(false);
            setLocationFilter(false);
            setStake('');
            setGame('');
            setLocation('');
            setDateFromFilter(false);
            setDateFrom(null);
            setDateToFilter(false);
            setDateTo(null);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Stats;
