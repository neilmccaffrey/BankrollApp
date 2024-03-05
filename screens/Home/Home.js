import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, Text, View} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Header from '../../components/Header/Header';
import SessionItem from '../../components/SessionItem/SessionItem';
import {useDispatch, useSelector} from 'react-redux';
import {resetToInitialState} from '../../redux/reducers/Sessions';
import {Routes} from '../../navigation/Routes';
import style from './style';
import Footer from '../../components/Footer/Footer';

const Home = ({navigation}) => {
  const session = useSelector(state => state.session);

  //const dispatch = useDispatch();
  //dispatch(resetToInitialState());

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      {/* must pass navigation as prop to be used by button */}
      <Header navigation={navigation} />
      {/* iterate through sessions array to display on homepage */}
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={style.alignCenter}>
            <Text style={style.emptyText}>
              {'Your sessions will appear here!'}
            </Text>
          </View>
        }
        //extraData={session.sessions}
        //filter out initial state that is assigned sessionId: 1
        initialNumToRender={20}
        data={session.sessions.filter(item => item.sessionId !== '1')}
        renderItem={({item}) => {
          return (
            <SessionItem
              result={item.result}
              gameType={item.gameType}
              date={item.date}
              hours={item.hours}
              minutes={item.minutes}
              sessionId={item.sessionId}
              //pass the session item to UpdateSession via route
              onPress={() =>
                navigation.navigate(Routes.UpdateSession, {...item})
              }
            />
          );
        }}
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
