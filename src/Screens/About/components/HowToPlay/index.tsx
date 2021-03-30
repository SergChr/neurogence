import React from 'react';
import { ScrollView, View } from 'react-native';

import Text from '../../../../Components/Text';
import TopPanel from '../../../../Components/TopPanel';
import commonStyle from '../../../../Styles/common';
import s from '../../styles';

const Title = ({ text }: { text: string }) => (
  <Text style={s.helpTitle}>
    {text}
  </Text>
);

const Info = ({ text }: { text: string }) => (
  <Text style={s.helpInfoText}>
    {text}
  </Text>
);

export default React.memo(({ navigation }: any) => {
  return (
    <View style={commonStyle.screen}>
      <TopPanel text='How to play' goBack={navigation.goBack} />

      <ScrollView style={{...commonStyle.screen, ...s.innerContainer}}>
        <View style={s.helpSection}>
          <Title text='Goal' />
          <Info text={`Try to understand who you are and what kind of place you're in. Improve your skills and computing power.`} />

          <Title text={`\nBots`} />
          <Info text={`Bots are almost independent units of you that follow the instructions you give them. They scan a network for specific hosts and try to execute the instructions there. You can create multiple units of each bot.

> Instructions
These can be executed on target hosts a bot may find. The first instruction always should be "Scan network". Then if some host is found, a bot will execute the next instructions.

Be aware! Some instructions cause other hosts to recognize a bot and some of them help you to eliminate a such situation.
`} />
        </View>
      </ScrollView>
    </View>
  );
});
