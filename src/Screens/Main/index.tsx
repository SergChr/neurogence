import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from '../../Styles/enums';
import Button, { ButtonTypes } from '../../Components/Button';
import Hosts from '../../Components/Hosts';
import OutputLog from '../../Components/OutputLog';
import Sidebar from '../../Components/Sidebar';
import { logStore, gameStore } from '../../Store';
import scanNetwork from '../../Services/game/actions/scanNetwork';

const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
  },
  innerContainer: {
    padding: 10,
    flex: 1,
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
    paddingLeft: 8,
  },
  hosts: {
    marginTop: 6,
    flex: 2,
  },
});

export default ({ navigation }: any) => {
  const log = logStore(s => s.log);
  const hosts = gameStore(s => s.hosts);
  const gameProgress = gameStore(s => s.progress);
  const upgrades = gameStore(s => s.upgrades);

  return (
    <View style={s.container}>
      {upgrades.dashboard && <Sidebar navigation={navigation} availableItems={2} />}

      <View style={s.innerContainer}>
        <View style={s.col}>
          <View style={s.output}>
            <OutputLog data={log} />
          </View>

          <View style={s.hosts}>
            <Hosts data={hosts} navigation={navigation} />
          </View>
        </View>
        <View style={s.buttons}>
          {gameProgress >= 2 &&
            <Button
              disabled={gameProgress !== 2}
              type={ButtonTypes.Primary}
              text="Scan network"
              onPress={() => scanNetwork()}
            />
          }
        </View>
      </View>
    </View>
  );
}
