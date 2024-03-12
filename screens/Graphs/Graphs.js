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
  faL,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import style from './style';
import {useDispatch, useSelector} from 'react-redux';
import dateFormat from 'dateformat';
import RadioButton from '../../components/RadioButton/RadioButton';
import {SwipeListView} from 'react-native-swipe-list-view';
import {deleteStake} from '../../redux/reducers/Stakes';

const Graphs = ({navigation}) => {
  const dispatch = useDispatch();
  const sessions = useSelector(state => state.session);
  const reverse = useSelector(state => state.session);
  const stakes = useSelector(state => state.stakes);
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

  //modal state
  const [modalVisible, setModalVisible] = useState(false);
  const [stake, setStake] = useState('');

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
  }, [tournamentFilter, cashFilter, stakeFilter, stake]);

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
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
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
        <Text>Filters:</Text>
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
      </View>
    </SafeAreaView>
  );
};

export default Graphs;
