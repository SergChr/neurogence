import React from 'react';
import { View } from 'react-native';

import Sidebar from '../../Components/Sidebar';
import FlatList from '../../Components/FlatList';
import BotListItem from './components/BotListItem';
import commonStyle from '../../Styles/common';
import s from './styles';

type Props = {
  navigation: any;
};

type State = {};

const items = [
  { name: 'Bot #1', enslaved: 1, all: 4, online: 4 },
  { name: 'Bot #1', enslaved: 1, all: 4, online: 4 },
  { name: 'Bot #1', enslaved: 1, all: 4, online: 4 },
  { name: 'Bot #1', enslaved: 1, all: 4, online: 4 },
];

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {}

  componentDidMount() {

  }

  onPickBot = (name: string) => this.props.navigation.navigate('BotDetails', { name });

  render() {
    return (
      <View style={{...commonStyle.screen, ...s.container}}>
        <Sidebar
          navigation={this.props.navigation}
          botsAvailable
        />

        <View style={s.innerContainer}>
          <FlatList>
            {items.map(i => (
              <BotListItem
                key={i.name}
                name={i.name}
                all={i.all}
                online={i.online}
                enslaved={i.enslaved}
                onPick={() => this.onPickBot(i.name)}
              />
            ))}
          </FlatList>
        </View>
      </View>
    );
  }
}
