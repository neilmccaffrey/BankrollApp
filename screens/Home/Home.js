import React, {useEffect, useState} from 'react';
import {Alert, SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Header from '../../components/Header/Header';
import SessionItem from '../../components/SessionItem/SessionItem';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteSession,
  resetToInitialState,
} from '../../redux/reducers/Sessions';
import {Routes} from '../../navigation/Routes';
import style from './style';
import Footer from '../../components/Footer/Footer';
import {SwipeListView} from 'react-native-swipe-list-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {updateBankroll} from '../../redux/reducers/Bankroll';

const Home = ({navigation}) => {
  const session = useSelector(state => state.session);
  //filter out initial state that is assigned sessionId: 1
  const [data, setData] = useState(
    session.sessions.filter(item => item.sessionId !== '1'),
  );

  //render after deletion
  useEffect(() => {
    setData(session.sessions.filter(item => item.sessionId !== '1'));
  }, [session.sessions]);

  const dispatch = useDispatch();
  //dispatch(resetToInitialState());

  const renderHiddenItem = renData => (
    <View style={style.hidden}>
      <TouchableOpacity
        style={style.backRightButton}
        onPress={() => {
          Alert.alert('DELETE', 'Are you sure you want to delete?', [
            {
              text: 'OK',
              onPress: () => {
                dispatch(deleteSession(renData.item.sessionId));
                dispatch(
                  updateBankroll(renData.item.buyIn - renData.item.cashOut),
                );
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]);
        }}>
        <FontAwesomeIcon icon={faTrashCan} color={'white'} size={20} />
        <Text style={style.textColor}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      {/* must pass navigation as prop to be used by button */}
      <Header navigation={navigation} />
      {/* iterate through sessions array to display on homepage */}
      <SwipeListView
        useFlatList={true}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={style.alignCenter}>
            <Text style={style.emptyText}>
              {'Your sessions will appear here!'}
            </Text>
          </View>
        }
        initialNumToRender={20}
        data={data}
        renderItem={({item}) => {
          return (
            <SessionItem
              result={item.result}
              gameType={item.gameType}
              date={item.date}
              hours={item.hours}
              minutes={item.minutes}
              sessionId={item.sessionId}
              stake={item.stake}
              game={item.game}
              location={item.location}
              buyIn={item.buyIn}
              //pass the session item to UpdateSession via route
              onPress={() =>
                navigation.navigate(Routes.UpdateSession, {...item})
              }
            />
          );
        }}
        renderHiddenItem={renderHiddenItem}
        keyExtractor={item => item.sessionId}
        //leftOpenValue={75}
        rightOpenValue={-75}
      />
      {/* must pass navigation as prop to be used by button */}
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;

// const [sessionList, setSessionList] = useState(session.sessions);
// const [sessionPage, setSessionPage] = useState(1);
// const [isLoading, setIsLoading] = useState(false);
// const sessionPageSize = 10;

// if (session.sessions !== sessionList) {
//   setSessionList(session.sessions);
// }

// useEffect(() => {
//   setIsLoading(true);
//   setSessionList(pagination(session.sessions, sessionPage, sessionPageSize));
//   setSessionPage(prev => prev + 1);
//   setIsLoading(false);
// }, []);

//use pagination to only load 10 sessions at a time with onEndReached
// const pagination = (items, pageNumber, pageSize) => {
//   const startIndex = (pageNumber - 1) * pageSize;
//   const endIndex = startIndex + pageSize;

//   //return empty array if no more items in list
//   if (startIndex >= endIndex) {
//     return [];
//   }
//   //return items to render
//   return items.slice(startIndex, endIndex);
// };

//*********Flatlist********** */
// onEndReachedThreshold={0.5}
// onEndReached={() => {
//   if (isLoading) {
//     return;
//   }
//   setIsLoading(true);
//   let newData = pagination(
//     session.sessions,
//     sessionPage,
//     sessionPageSize,
//   );
//   if (newData.length > 0) {
//     setSessionPage(prevState => prevState + 1);
//     setSessionList(prevState => [...prevState, ...newData]);
//   }
//   setIsLoading(false);
// }}
