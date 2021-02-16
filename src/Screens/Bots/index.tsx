import React from 'react';
import { View } from 'react-native';

import Sidebar from '../../Components/Sidebar';
import FlatList from '../../Components/FlatList';
import BotListItem from './components/BotListItem';
import Text from '../../Components/Text';
import Button, { ButtonTypes } from '../../Components/Button';
import commonStyle from '../../Styles/common';
import { gameStore, logStore } from '../../Store';
import s from './styles';
import { BotData } from '../../Services/game/entities/bot';
import { GameVars } from '../../Config/enums';

type Props = {
  navigation: any;
};

export default ({ navigation }: Props) => {
  const onPickBot = (id?: string) => navigation.navigate('BotDetails', { id });
  const bots = gameStore(s => s.bots);
  const releaseBot = (b: BotData) => {
    gameStore.getState().updateBot({
      ...b,
      metrics: {
        ...b.metrics,
        quantity: b.metrics.quantity + 1,
      },
    });
  }
  const removeOneInstanceOfBot = (b: BotData) => {
    gameStore.getState().updateBot({
      ...b,
      metrics: {
        ...b.metrics,
        quantity: b.metrics.quantity - 1,
      },
    });
  }
  const botLogs = logStore(s => s.botLog);
  const gameVars = gameStore(s => s.variables);

  return (
    <View style={{...commonStyle.screen, ...s.container}}>
      <Sidebar
        navigation={navigation}
        botsAvailable
      />

      <View style={s.innerContainer}>
        {bots.length < 1 && (
          <View style={s.emptySection}>
            <Text style={s.emptyText}>No automation exists yet.</Text>
          </View>
        )}
        <FlatList>
          {bots.map(i => (
            <BotListItem
              key={i.name}
              name={i.name}
              all={i.metrics.quantity}
              enslaved={i.metrics.absorbedHosts}
              onPick={() => onPickBot(i.id)}
              onRelease={() => releaseBot(i)}
              logs={botLogs.get(i.id)}
              removeOne={() => removeOneInstanceOfBot(i)}
              canRelease={i.metrics.quantity <= gameVars.get(GameVars.MaxBotInstances)}
              canRemove={i.metrics.quantity > 0}
            />
          ))}
        </FlatList>

        <Button
          disabled={bots.length > gameVars.get(GameVars.MaxBots)}
          onPress={() => onPickBot()}
          type={ButtonTypes.Primary}
          text='Create a bot'
        />
      </View>
    </View>
  );
}
