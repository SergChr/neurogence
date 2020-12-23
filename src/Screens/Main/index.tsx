import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from '../../Styles/enums';
import Button, { ButtonTypes } from '../../Components/Button';
import Hosts from '../../Components/Hosts';
import OutputLog from '../../Components/OutputLog';
import { logStore, gameStore } from '../../Store';

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    flex: 4,
    height: '100%',
  },
  output: {
    flex: 2,
  },
  buttons: {
    flex: 2,
  },
  hosts: {
    marginTop: 6,
    flex: 2,
  },
});

export default () => {
  const log = logStore(s => s.log);
  const hosts = gameStore(s => s.hosts);

  return (
    <View style={s.container}>
      <View style={s.col}>
        <View style={s.output}>
          <OutputLog data={log} />
        </View>

        <View style={s.hosts}>
          <Hosts data={hosts} />
        </View>
      </View>
      <View style={s.buttons}>
          <Button
            type={ButtonTypes.Primary}
            text="Scan network"
          />
        </View>
    </View>
  );
}
