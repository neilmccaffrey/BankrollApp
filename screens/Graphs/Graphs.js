import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import {LineChart} from 'react-native-chart-kit';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import dateFormat from 'dateformat';
import RadioButton from '../../components/RadioButton/RadioButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import {deleteStake} from '../../redux/reducers/Stakes';
import {deleteGame} from '../../redux/reducers/Games';
import {deleteLocation} from '../../redux/reducers/Locations';
import Button from '../../components/Button/Button';
import DatePicker from 'react-native-date-picker';

const Graphs = ({navigation}) => {
  const dispatch = useDispatch();
  const sessions = useSelector(state => state.session);
  const reverse = useSelector(state => state.session);
  const stakes = useSelector(state => state.stakes);
  const games = useSelector(state => state.games);
  const locations = useSelector(state => state.locations);
  const [dates, setDates] = useState(
    sessions.sessions.map(session => dateFormat(session.date, 'mm-dd-yy')),
  );
  const initialArr = [
    ...reverse.sessions.filter(item => item.sessionId !== '1'),
  ].reverse();

  const [bySession, setBySession] = useState(true);
  const [tournamentFilter, setTournamentFilter] = useState(false);
  const [cashFilter, setCashFilter] = useState(false);
  const [allFilter, setAllFilter] = useState(true);
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

  //array must have a value to avoid infinity error with chart-kit
  const [dataSet, setDataSet] = useState([0]);
  //selected radio button default all
  const [selectedValue, setSelectedValue] = useState('all');

  //update filters on change
  useEffect(() => {
    let filteredArr = initialArr;
    let data = 0;

    if (tournamentFilter) {
      filteredArr = filteredArr.filter(
        session => session.gameType === 'Tournament',
      );
    }

    if (cashFilter) {
      filteredArr = filteredArr.filter(
        session => session.gameType === 'Cash game',
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

    if (filteredArr.length > 0) {
      data = filteredArr.map(session => (data += session.result));
      setDataSet(data);
      setDates(
        filteredArr.map(session => dateFormat(session.date, 'mm-dd-yy')),
      );
    } else {
      //set data to render an empty graph if no data for filter results
      data = [0];
      setDataSet(data);
      setDates([0]);
    }
  }, [
    tournamentFilter,
    cashFilter,
    stakeFilter,
    stake,
    gameFilter,
    game,
    locationFilter,
    location,
    dateFromFilter,
    dateFrom,
    dateToFilter,
    dateTo,
  ]);

  //Radio button options
  const radioOptions = [
    {label: 'All Sessions', value: 'all'},
    {label: 'Cash', value: 'cash'},
    {label: 'Tournament', value: 'tournament'},
  ];

  //function for number of dates allowed on labels to account for small mobile screen size
  function reduceLabels(labelDates) {
    const interval = Math.ceil(labelDates.length / 4);
    return labelDates.filter((date, index) => index % interval === 0);
  }

  return (
    <SafeAreaView
      style={[globalStyle.backgroundWhite, globalStyle.flex, style.justify]}>
      <View>
        <Pressable style={style.backButton} onPress={() => navigation.goBack()}>
          <FontAwesomeIcon style={style.backButtonText} icon={faChevronLeft} />
        </Pressable>
        <View>
          {bySession && (
            <LineChart
              data={{
                labels: reduceLabels(dates),
                datasets: [{data: dataSet}],
              }}
              width={Dimensions.get('window').width}
              height={300}
              yAxisLabel="$"
              chartConfig={{
                backgroundColor: '#1DA1F2',
                backgroundGradientFrom: '#1E2923',
                backgroundGradientTo: '#1DA1F2',
                color: (opacity = 1) => `rgba(26,255,146, ${opacity})`,
              }}
            />
          )}
        </View>
        <View style={style.container}>
          <Text style={style.textColor}>Filters:</Text>
          <View style={style.radioButtonsContainer}>
            {radioOptions.map(option => (
              <RadioButton
                key={option.value}
                isSelected={selectedValue === option.value}
                label={option.label}
                onPress={() => {
                  if (option.value === 'tournament') {
                    setTournamentFilter(true);
                    setCashFilter(false);
                    setAllFilter(false);
                    setStakeFilter(false);
                    setStake('');
                  }
                  if (option.value === 'cash') {
                    setTournamentFilter(false);
                    setCashFilter(true);
                    setAllFilter(false);
                  }
                  if (option.value === 'all') {
                    setTournamentFilter(false);
                    setCashFilter(false);
                    setAllFilter(true);
                    setStakeFilter(false);
                    setStake('');
                  }

                  setSelectedValue(option.value);
                }}
              />
            ))}
          </View>
          <View style={style.filtersContainer}>
            {cashFilter && (
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
                <Text style={[style.textColor, style.dateSize]}>
                  {location}
                </Text>
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
              <Pressable
                style={style.press}
                onPress={() => setOpenDateTo(true)}>
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
            setAllFilter(true);
            setSelectedValue('all');
            setTournamentFilter(false);
            setCashFilter(false);
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

export default Graphs;
