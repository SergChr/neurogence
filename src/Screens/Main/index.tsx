import React from 'react';
import { View } from 'react-native';

import commonStyle from '../../Styles/common';;
import Button, { ButtonTypes } from '../../Components/Button';
import Hosts from '../../Components/Hosts';
import OutputLog from '../../Components/OutputLog';
import Sidebar from '../../Components/Sidebar';
import InfoPanel from '../../Components/InfoPanel';
import { logStore, gameStore } from '../../Store';
import scanNetwork from '../../Services/game/actions/scanNetwork';
import s from './styles';
import { Upgrades } from '../../Services/game/entities/hosts/enums';

export default ({ navigation }: any) => {
  const log = logStore(s => s.log);
  const hosts = gameStore(s => s.hosts);
  const gameProgress = gameStore(s => s.progress.value);
  const upgrades = gameStore(s => s.upgrades);
  const localhost = gameStore(s => s.getLocalhost());

  return (
    <View style={{...s.container, ...commonStyle.screen}}>
      <Sidebar
        navigation={navigation}
      />

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
            <InfoPanel
              data={localhost}
              full={!!upgrades[Upgrades.MetricsPanel]}
            />
          </View>

          <View style={s.buttons}>
            {gameProgress >= 2 &&
              <Button
                disabled={hosts.length > 1}
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
