import React from 'react';
import {
  View,
} from 'react-native';

import Button from './components/Button';
import Terminal, { MessageTypes } from './components/Terminal';
import TopPanel from '../../Components/TopPanel';
// import { gameStore } from '../../Store';
import commonStyle from '../../Styles/common';
import HostTerminal from '../../Services/game/entities/hostTerminal';
import s from './styles';

type Props = {
  route: any;
  navigation: any;
}

export default class HostScreen extends React.PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }
  terminal?: HostTerminal;

  state = {
    cursor: [],
    output: [],
  }

  setCursor = (c: string[]) => this.setState({ cursor: c });

  componentDidMount() {
    const { hostName } = this.props.route.params;
    this.terminal = new HostTerminal(hostName);
    this.setState({ output: [this.terminal!.getOptions([])] });
  }

  onAnswer = (v: string) => {
    // TODO: implement
    //////
    const newOpts = this.terminal!.getOptions(this.state.cursor);
    this.setState({
      output: [...this.state.output, newOpts],
      cursor: [...this.state.cursor, v],
    })
  }

  render() {
    const { hostName } = this.props.route.params;
    const { cursor, output } = this.state;
    return (
      <View style={commonStyle.screen}>
        <TopPanel text={`Host: ${hostName}`} goBack={this.props.navigation.goBack} />
  
        <View style={s.container}>
        <View style={s.terminal}>
            <Terminal items={output} />
          </View>
  
          <View style={s.buttons}>
            <View style={s.buttonsRow}>
              <Button text="1" onPress={() => 's'} />
              <Button text="2" onPress={() => 's'} />
              <Button text="3" onPress={() => 's'} />
            </View>
  
            <View style={s.buttonsRow}>
              <Button text="4" onPress={() => 's'} />
              <Button text="5" onPress={() => 's'} />
              <Button text="6" onPress={() => 's'} />
            </View>
  
            <View style={s.buttonsRow}>
              <Button text="7" onPress={() => 's'} />
              <Button text="8" onPress={() => 's'} />
              <Button text="9" onPress={() => 's'} />
            </View>
  
            <View style={s.buttonsRow}>
              <Button text="<" onPress={() => 's'} />
              <Button text="0" onPress={() => 's'} />
              <Button text=">" onPress={() => 's'} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}
