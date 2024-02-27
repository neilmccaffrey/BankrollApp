import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView} from 'react-native';
import globalStyle from '../../styles/globalStyle';
import Header from '../../components/Header/Header';
import SessionItem from '../../components/SessionItem/SessionItem';
import {useSelector} from 'react-redux';

const Home = ({navigation}) => {
  const session = useSelector(state => state.session);
  const [sessionList, setSessionList] = useState(session.sessions);
  const [sessionPage, setSessionPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const sessionPageSize = 10;

  useEffect(() => {
    setIsLoading(true);
    setSessionList(pagination(session.sessions, sessionPage, sessionPageSize));
    setSessionPage(prev => prev + 1);
    setIsLoading(false);
  }, []);

  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    //return empty array if no more items in list
    if (startIndex >= endIndex) {
      return [];
    }
    //return items to render
    return items.slice(startIndex, endIndex);
  };

  //if a new session is added to sessions setSessionList to sessions to trigger rerender
  if (session.sessions[0].sessionId !== sessionList[0].sessionId) {
    setSessionList(session.sessions);
  }

  return (
    <SafeAreaView style={[globalStyle.backgroundWhite, globalStyle.flex]}>
      {/* must pass navigation as prop to be used by button */}
      <Header navigation={navigation} />
      {/* iterate through sessions array to display on homepage */}
      <FlatList
        horizontal={false}
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if (isLoading) {
            return;
          }
          setIsLoading(true);
          let newData = pagination(
            session.sessions,
            sessionPage,
            sessionPageSize,
          );
          if (newData.length > 0) {
            setSessionPage(prevState => prevState + 1);
            setSessionList(prevState => [...prevState, ...newData]);
          }
          setIsLoading(false);
        }}
        data={sessionList}
        renderItem={({item}) => {
          return (
            <SessionItem
              key={item.sessionId}
              result={item.result}
              gameType={item.gameType}
              date={item.date}
              hours={item.hours}
              minutes={item.minutes}
            />
          );
        }}
      />
      <Header />
    </SafeAreaView>
  );
};

export default Home;
