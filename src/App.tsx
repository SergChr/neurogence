import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';

import MainScreen from './Screens/Main';
import HostScreen from './Screens/Host';
import BotsScreen from './Screens/Bots';
import BotDetailsScreen from './Screens/BotDetails';
import AboutScreen from './Screens/About';
import HowToPlayScreen from './Screens/About/components/HowToPlay';
import Game from './Services/game';
import Alert from './Components/Alert';

Game.run();

const Stack = createStackNavigator();

const TransitionScreenOptions = {
  ...TransitionPresets.RevealFromBottomAndroid,
};

// TODO: remove
// Current gameplay (as for 13 January 2021) estimation time: 5.5 mins

const App = () => {
	useEffect(() => {
		StatusBar.setHidden(true);
	});
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={TransitionScreenOptions} headerMode="none">
        <Stack.Screen
          name="Home"
          component={MainScreen}
        />
        <Stack.Screen
          name="Host"
          component={HostScreen}
        />
        <Stack.Screen
          name="Bots"
          component={BotsScreen}
        />
        <Stack.Screen
          name="BotDetails"
          component={BotDetailsScreen}
        />
        <Stack.Screen
          name="About"
          component={AboutScreen}
        />
        <Stack.Screen
          name="HowToPlay"
          component={HowToPlayScreen}
        />
      </Stack.Navigator>
      <Alert />
    </NavigationContainer>
  );
};

export default App;
