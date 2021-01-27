import React from 'react';
import { View } from 'react-native';

import Sidebar from '../../Components/Sidebar';
import FlatList from '../../Components/FlatList';
import BotListItem from './components/BotListItem';
import Text from '../../Components/Text';
import Button, { ButtonTypes } from '../../Components/Button';
import commonStyle from '../../Styles/common';
import { gameStore } from '../../Store';
import s from './styles';

type Props = {
  navigation: any;
};

export default ({ navigation }: Props) => {
  const onPickBot = (id?: string) => navigation.navigate('BotDetails', { id });
  const bots = gameStore(s => s.bots);
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
              online={i.metrics.online}
              enslaved={i.metrics.absorbedHosts}
              onPick={() => onPickBot(i.id)}
            />
          ))}
        </FlatList>

        <Button
          onPress={() => onPickBot()}
          type={ButtonTypes.Primary}
          text='Create a bot'
        />
      </View>
    </View>
  );
}
