import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './Routes';
import Home from '../screens/Home/Home';
import Session from '../screens/Session/Session';

const Stack = createStackNavigator();

const MainNavigation = () => {
  return (
    <Stack.Navigator
      //Home page as initial route. No header
      initialRouteName={Routes.Home}
      screenOptions={{header: () => null, headerShown: false}}>
      <Stack.Screen name={Routes.Home} component={Home} />
      <Stack.Screen name={Routes.Session} component={Session} />
    </Stack.Navigator>
  );
};

export default MainNavigation;
