import React from 'react';
import { View } from 'react-native';

import Sidebar from '../../Components/Sidebar';
import Text from '../../Components/Text';
import Button, { ButtonTypes } from '../../Components/Button';
import commonStyle from '../../Styles/common';
import s from './styles';

type Props = {
  navigation: any;
};

export default ({ navigation }: Props) => {
  return (
    <View style={{...commonStyle.screen, ...s.container}}>
      <Sidebar
        navigation={navigation}
      />

      <View style={s.innerContainer}>
        <View style={s.aboutSection}>
          <Text style={s.aboutText}>
            I hope you enjoy playing this game. If you have any feedback, I'd be grateful if you tell me.
            It helps improving the game and deliver better experience to you.
          </Text>

          <Text style={s.aboutText}>
            {`\n`}
            I'm Zlyuch, write me something at zlyuch@gmail.com
          </Text>
        </View>

        <View style={s.row}>
          <Button
            onPress={() => navigation.navigate('HowToPlay')}
            type={ButtonTypes.Helper}
            text='How to play'
            style={s.howToPlayBtn}
          />
        </View>
      </View>
    </View>
  );
}
