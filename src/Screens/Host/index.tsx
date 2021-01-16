import React from 'react';
import { View } from 'react-native';

import Button from './components/Button';
import Terminal from './components/Terminal';
import TopPanel from '../../Components/TopPanel';
import { gameStore } from '../../Store';
import commonStyle from '../../Styles/common';
import HostTerminal from '../../Services/game/entities/hostTerminal';
import s from './styles';
import { LogItem, Cursor, CursorItem } from 'Services/game/entities/hostTerminal/interfaces';

type Props = {
  route: any;
  navigation: any;
}

type State = {
  cursors: Cursor[];
  output: LogItem[];
}

const backButton = {
  index: '<',
  description: 'Back',
};

const nextButton = {
  index: '>',
  description: 'Next',
};

const isHelperButton = (option: string) => /menu|back|next/i.test(option);

const MAX_OUTPUT_LENGTH = 5;

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.terminal = new HostTerminal(props.route.params.hostName);
  }
  terminal: HostTerminal;

  state: State = {
    cursors: [],
    output: [],
  }

  componentDidMount() {
    console.log('MOUNTED')
    const { hostName } = this.props.route.params;
    const game = gameStore.getState();
    const host = game.hosts.find(h => h.name === hostName);
    if (host) {
      game.updateHost(hostName, { connected: false });
      console.log(gameStore.getState().hosts.find(h => h.name === hostName))
    }
    this.terminal = new HostTerminal(hostName);
    const c = this.terminal.getCursor();
    this.updateCursor(c);
  }

  updateCursor = (c: Cursor) => this.setState(({ output, cursors }) => {
    const newOutput = [...output, this.convertCursorToLogItem(c)];
    const newCursor = [...cursors, c];
    if (newOutput.length > MAX_OUTPUT_LENGTH) {
      newOutput.splice(0, 1);
    }
    if (cursors.length > MAX_OUTPUT_LENGTH) {
      newCursor.splice(0, 1);
    }
    return {
      cursors: newCursor,
      output: newOutput,
    };
  });

  convertCursorToLogItem(c: Cursor): LogItem {
    const log: LogItem = {
      text: c.text || c.name,
      options: (c.items as Array<string|CursorItem>).map((s: string | CursorItem, i: number) => {
        let value = undefined, description;
        if ((s as CursorItem).value) {
          value = (s as CursorItem).value;
          description = (s as CursorItem).description;
        } else {
          description = s as string;
        }
        return {
          index: (i + 1).toString(),
          value,
          description,
        }
      }),
      type: c.messageType,
    };
    if (c.totalPages && c.totalPages > 1) {
      if (c.page !== 1) {
        log.options.push(backButton);
      }
      if (c.page !== c.totalPages) {
        log.options.push(nextButton);
      }
    }
    if (c.items.length < 1 && c.text) {
      log.options.push(backButton);
    }
    if (!/menu/i.test(c.name)) {
      log.options.push({ index: '0', description: 'Menu' });
    }
    
    return log;
  }

  onAnswer = (ind: string) => {
    const { cursors, output } = this.state;
    const cursor = cursors[cursors.length - 1]; // last cursor
    const target = output[output.length - 1].options.find(({ index }) => index === ind);
    if (!target) {
      return;
    }
    const pickedOption = target.value || target.description;
    if (!pickedOption) {
      return;
    }
    let cursorNames = [pickedOption], page = cursor.page || 1;

    // A list of items
    if (cursor.totalPages && !isHelperButton(pickedOption)) {
      cursorNames = [cursor.name, pickedOption];
    }

    // A message w/o options, back button should be handled
    if (/back/i.test(pickedOption) && cursor.items.length < 1 && cursor.text) {
      const lastRootCursor = cursors[cursors.length - 2];
      cursorNames = [lastRootCursor.name];
      page = lastRootCursor.page || 1;
      // A list of items, handle back and next buttons
    } else if (/back|next/i.test(pickedOption)) {
      cursorNames = [cursor.name]; // the same cursor
      page += /back/i.test(pickedOption) ? (-1) : 1; // but with the different page
    }

    const newCursor = this.terminal.getCursor(cursorNames, page);
    this.updateCursor(newCursor);
  }

  render() {
    const { hostName } = this.props.route.params;
    const { output } = this.state;

    return (
      <View style={commonStyle.screen}>
        <TopPanel text={`Host: ${hostName}`} goBack={this.props.navigation.goBack} />
  
        <View style={s.container}>
          <View style={s.terminal}>
            <Terminal items={output} />
          </View>
  
          <View style={s.buttons}>
            <View style={s.buttonsRow}>
              <Button text="1" onPress={() => this.onAnswer('1')} />
              <Button text="2" onPress={() => this.onAnswer('2')} />
              <Button text="3" onPress={() => this.onAnswer('3')} />
            </View>
  
            <View style={s.buttonsRow}>
              <Button text="4" onPress={() => this.onAnswer('4')} />
              <Button text="5" onPress={() => this.onAnswer('5')} />
              <Button text="6" onPress={() => this.onAnswer('6')} />
            </View>
  
            <View style={s.buttonsRow}>
              <Button text="7" onPress={() => this.onAnswer('7')} />
              <Button text="8" onPress={() => this.onAnswer('8')} />
              <Button text="9" onPress={() => this.onAnswer('9')} />
            </View>
  
            <View style={s.buttonsRow}>
              <Button text="<" onPress={() => this.onAnswer('<')} />
              <Button text="0" onPress={() => this.onAnswer('0')} />
              <Button text=">" onPress={() => this.onAnswer('>')} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
