import React from 'react';
import { View, TextInput } from 'react-native';

import TopPanel from '../../Components/TopPanel';
import Button, { ButtonTypes } from '../../Components/Button';
import Pressable, { PressableTypes } from '../../Components/Button/Pressable';
import Picker from '../../Components/Picker';
import Text from '../../Components/Text';
import Instructions from './components/Instructions';
import commonStyle from '../../Styles/common';
import s from './styles';
import { ScriptUpdateInstructions, ActionTypes } from './interface';
import Bot, { BotData } from '../../Services/game/entities/bot';
import { ScriptItem } from '../../Services/game/entities/bot/interface';
import { gameStore } from '../../Store';
import { OS } from '../../Services/game/entities/hosts/enums';
import { showMessage } from '../../utils/notifications';
import { GameVars } from '../../Config/enums';

type Props = {
  navigation: any;
  route: any;
};

type State = {
  bot: Bot | Record<string, any>;
  saved?: boolean;
  scriptsLimit: number;
};

const OSs = Object.entries(OS).map(([k, v]) => ({ label: k, value: v }));

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.route.params;
    if (id) {
      const store = gameStore.getState();
      const targetBot = store.bots.find(b => b.id === id);
      this.setState({
        bot: targetBot!,
        saved: true,
        scriptsLimit: store.variables.get(GameVars.MaxBotScripts),
      });
    } else {
      const bot = new Bot();
      this.setState({ bot });
    }
  }

  state: State = {
    bot: {},
    scriptsLimit: 6,
  };

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
          if ((items[p.index!] as ScriptItem[]).length === 0) {
            items.splice(p.index!, 1);
          }
        } else {
          items.splice(p.index!, 1);
        }
        break;
      }
      case ActionTypes.Add: {
        if (p.payload!.hasOrSupport && typeof p.index === 'undefined') {
          items.push([Bot.createScript(p.payload!)]);
        } else if (p.payload!.hasOrSupport && typeof p.index === 'number') {
          (items[p.index] as ScriptItem[]).push(Bot.createScript(p.payload!));
        } else {
          items.push(Bot.createScript(p.payload!));
        }
        break;
      }
      case ActionTypes.Update: {
        if (p.secondaryIndex) {
          (items[p.index!] as ScriptItem[])[p.secondaryIndex!] = p.payload!;
        } else if (p.payload!.hasOrSupport) {
          items[p.index!] = [Bot.createScript(p.payload!)];
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
    store.updateBot(this.state.bot! as BotData);
    this.setState({ saved: true });
    showMessage({
      type: 'success',
      message: `Saved`,
      duration: 500,
    });
  }

  remove = () => {
    const store = gameStore.getState();
    store.updateBot(this.state.bot! as BotData, true);
    this.props.navigation.goBack();
    showMessage({
      type: 'success',
      message: `${this.state.bot.name} was removed`,
      duration: 500,
    });
  }

  setField = (k: string, v: string | number) => {
    this.setState({ bot: { ...this.state.bot, [k]: v } });
  }

  showOnDeleteNotification = () => showMessage({
    message: 'Long press to remove',
    duration: 500,
  });

  render() {
    const { bot, saved, scriptsLimit } = this.state;
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
              canAddMore={(bot.scripts?.length ?? 0) < scriptsLimit}
            />
          </View>
          
          <View style={s.rightBlock}>
            <View style={s.row}>
              <Text style={s.rightBlockText}>Bot name:</Text>
              <TextInput
                style={s.textInput}
                onChangeText={text => this.setField('name', text)}
                value={bot.name}
              />
            </View>

            <View style={s.row}>
              <Text style={s.rightBlockText}>Target OS:</Text>
              <Picker
                onChange={(v: string | number) => this.setField('targetOS', v)}
                values={OSs}
                value={bot.targetOS}
              />
            </View>

            <View style={s.rowInfo}>
              <Text style={s.rightBlockText}>Instructions:</Text>
              <Text style={s.leftInfoText}>{bot.scripts?.length ?? 0}/{scriptsLimit}</Text>
            </View>

            <Button
              type={ButtonTypes.Primary}
              text='Save'
              onPress={this.save}
            />

            {saved &&
              <Pressable
                type={PressableTypes.Danger}
                text='Remove'
                onPress={this.remove}
                onShortPress={this.showOnDeleteNotification}
              />
            }
          </View>
        </View>
      </View>
    );
  }
}
