import React from 'react';
import { View } from 'react-native';

import TopPanel from '../../Components/TopPanel';
import Button, { ButtonTypes } from '../../Components/Button';
import Instructions from './components/Instructions';
import commonStyle from '../../Styles/common';
import s from './styles';
import { ScriptUpdateInstructions, ActionTypes } from './interface';
import Bot, { BotData } from '../../Services/game/entities/bot';
import { ScriptItem } from '../../Services/game/entities/bot/interface';
import { gameStore } from '../../Store';

type Props = {
  navigation: any;
  route: any;
};

type State = {
  bot?: BotData;
  saved?: boolean;
};

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.route.params;
    if (id) {
      const bots = gameStore.getState().bots;
      const targetBot = bots.find(b => b.id === id);
      this.setState({ bot: targetBot, saved: true });
    } else {
      const bot = new Bot();
      this.setState({ bot });
    }
  }

  state: State = {};

  updateInstructions = (p: ScriptUpdateInstructions) => {
    const { bot } = this.state;
    if (!bot) {
      return;
    }
    const items = [...bot.scripts];
    switch (p.actionType) {
      case ActionTypes.Delete: {
        if (Array.isArray(items[p.index!])) {
          (items[p.index!] as ScriptItem[]).splice(p.secondaryIndex!, 1);
        } else {
          items.splice(p.index!, 1);
        }
        break;
      }
      case ActionTypes.Add: {
        if (p.payload!.hasOrSupport) {
          items.push([Bot.createScript(p.payload!)]);
        } else {
          items.push(Bot.createScript(p.payload!));
        }
        break;
      }
      case ActionTypes.Update: {
        if (p.secondaryIndex) {
          (items[p.index!] as ScriptItem[])[p.secondaryIndex!] = p.payload!;
        } else {
         items[p.index!] = p.payload!;
        }
        break;
      }
    }
    this.setState({
      bot: {...bot, scripts: items},
    });
  }

  save = () => {
    const store = gameStore.getState();
    store.updateBot(this.state.bot!);
    this.setState({ saved: true });
  }

  remove = () => {
    const store = gameStore.getState();
    store.updateBot(this.state.bot!, true);
    this.props.navigation.goBack();
  }

  render() {
    const { bot, saved } = this.state;
    if (!bot) {
      return null;
    }
    return (
      <View style={commonStyle.screen}>
        <TopPanel text={bot.name} goBack={this.props.navigation.goBack} />

        <View style={{...commonStyle.screen, ...s.innerContainer}}>
          <View style={s.instructions}>
            <Instructions
              data={bot.scripts}
              onUpdate={this.updateInstructions}
            />
          </View>
          <Button
            type={ButtonTypes.Primary}
            text='Save'
            onPress={this.save}
          />

          {saved &&
            <Button
              type={ButtonTypes.Primary}
              text='Remove'
              onPress={this.remove}
            />
          }
        </View>
      </View>
    );
  }
}
