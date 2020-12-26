import React from 'react';
import {
  View,
} from 'react-native';

import Button from './components/Button';
import Terminal from './components/Terminal';
import TopPanel from '../../Components/TopPanel';
import { gameStore } from '../../Store';
import commonStyle from '../../Styles/common';
import s from './styles';

export default ({ navigation, route }: any) => {
  const hosts = gameStore(s => s.hosts);
  const host = hosts.find(h => h.name === route.params.hostName)!;
  return (
    <View style={commonStyle.screen}>
      <TopPanel text={`Host: ${route.params.hostName}`} goBack={navigation.goBack} />

      <View style={s.container}>
      <View style={s.terminal}>
          <Terminal host={host} />
        </View>

        <View style={s.buttons}>
          <View style={s.buttonsRow}>
            <Button text="1" onPress={() => 's'} />
            <Button text="2" onPress={() => 's'} />
            <Button text="3" onPress={() => 's'} />
          </View>

          <View style={s.buttonsRow}>
            <Button text="4" onPress={() => 's'} />
            <Button text="5" onPress={() => 's'} />
            <Button text="6" onPress={() => 's'} />
          </View>

          <View style={s.buttonsRow}>
            <Button text="7" onPress={() => 's'} />
            <Button text="8" onPress={() => 's'} />
            <Button text="9" onPress={() => 's'} />
          </View>

          <View style={s.buttonsRow}>
            <Button text="<" onPress={() => 's'} />
            <Button text="0" onPress={() => 's'} />
            <Button text=">" onPress={() => 's'} />
          </View>
        </View>
      </View>
    </View>
  );
}
