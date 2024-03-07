import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import {logger} from 'redux-logger';

import Bankroll from './reducers/Bankroll';
import Sessions from './reducers/Sessions';
import Stakes from './reducers/Stakes';
import Games from './reducers/Games';

const rootReducer = combineReducers({
  bankroll: Bankroll,
  session: Sessions,
  stakes: Stakes,
  games: Games,
});

const configuration = {
  key: 'root',
  storage: AsyncStorage,
  version: 1,
};

const persistedReducer = persistReducer(configuration, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({
      serializableCheck: false,
    }); //.concat(logger);
  },
});

export default store;
export const persistor = persistStore(store);
