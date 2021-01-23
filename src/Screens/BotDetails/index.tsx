import React from 'react';
import { View } from 'react-native';

import { Scripts } from '../../Services/game/entities/bot/interface';
import TopPanel from '../../Components/TopPanel';
import Instructions from './components/Instructions';
import commonStyle from '../../Styles/common';
import s from './styles';

type Props = {
  navigation: any;
  route: any;
};

type State = {
  instructions: any;
};

const script = (type: Scripts, thenText: string, shouldBeLast = false) => ({
  type,
  thenText,
  shouldBeLast,
});

const mock = {
  scripts: [
    script(Scripts.SearchForHosts, 'Then if found'),
    [
      script(Scripts.BruteforcePassword, 'Then if matched'),
      script(Scripts.AbsorbViaSecurityIssue, 'Once absorbed, then'),
    ],
    [
      script(Scripts.SearchForHosts, 'Then if found'),
    ],
  ],
};

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {
    instructions: mock.scripts,
  }

  componentDidMount() {

  }

  render() {
    const { name } = this.props.route.params;
    const { instructions } = this.state;
    return (
      <View style={commonStyle.screen}>
        <TopPanel text={name} goBack={this.props.navigation.goBack} />

        <View style={{...commonStyle.screen, ...s.innerContainer}}>
          <View style={s.instructions}>
            <Instructions
              data={instructions}
            />
          </View>
        </View>
      </View>
    );
  }
}
