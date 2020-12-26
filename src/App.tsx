import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from './Screens/Main';
import HostScreen from './Screens/Host';
import Game from './Services/game';

Game.run();

const Stack = createStackNavigator();

const App = () => {
	useEffect(() => {
		StatusBar.setHidden(true);
	});
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen
          name="Home"
          component={MainScreen}
        />
        <Stack.Screen
          name="Host"
          component={HostScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
