import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import commonStyle from '../../Styles/common';;
import Button, { ButtonTypes } from '../../Components/Button';
import Hosts from '../../Components/Hosts';
import OutputLog from '../../Components/OutputLog';
import Sidebar from '../../Components/Sidebar';
import InfoPanel from '../../Components/InfoPanel';
import { logStore, gameStore } from '../../Store';
import scanNetwork from '../../Services/game/actions/scanNetwork';
import { Metrics } from '../../Styles/enums';

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  output: {
    flex: 2,
  },
  buttons: {
    flex: 1,
    marginLeft: 6,
    marginTop: 6,
  },
  hosts: {
    marginTop: 6,
    flex: 2,
  },
  infoPanel: {
    flex: 1,
    marginLeft: 6,
  },
  widthSM: {
    flex: 1,
  },
  widthM: {
    flex: 2,
  },
});

export default ({ navigation }: any) => {
  const log = logStore(s => s.log);
  const hosts = gameStore(s => s.hosts);
  const gameProgress = gameStore(s => s.progress);
  const upgrades = gameStore(s => s.upgrades);
  const localhost = gameStore(s => s.getLocalhost());

  return (
    <View style={{...s.container, ...commonStyle.screen}}>
      {/* <Sidebar navigation={navigation} availableItems={2} />} */}

      <View style={s.innerContainer}>
        <View style={{...s.col, ...s.widthM}}>
          <View style={s.output}>
            <OutputLog data={log} />
          </View>

          <View style={s.hosts}>
            <Hosts data={hosts} navigation={navigation} />
          </View>
        </View>

        <View style={{...s.col, ...s.widthSM}}>
          <View style={s.infoPanel}>
            <InfoPanel data={localhost} full={upgrades.dashboard} />
          </View>

          <View style={s.buttons}>
            {gameProgress >= 2 &&
              <Button
                disabled={gameProgress !== 2}
                type={ButtonTypes.Primary}
                text="Scan network"
                onPress={scanNetwork}
              />
            }
          </View>
        </View>
      </View>
    </View>
  );
}
