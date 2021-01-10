import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Colors } from '../../Styles/enums';
import Text from '../Text';

const s = StyleSheet.create({
  container: {
    height: 44,
    backgroundColor: Colors.Secondary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  text: {
    color: Colors.Grey,
    fontWeight: '700',
    alignSelf: 'center',
    textAlign: 'center'
  },
  goBack: {
    position: 'absolute',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    paddingLeft: 28,
    paddingRight: 28,
  },
});

type Props = {
  text: string;
  goBack: () => void;
}

export default ({ text, goBack }: Props) => {
  return (
    <View style={s.container}>
      <TouchableOpacity style={s.goBack} onPress={goBack}>
        <Image style={s.icon} source={require('../../assets/images/arrow-left.png')} />
      </TouchableOpacity>

      <Text style={s.text}>
        {text}
      </Text>
    </View>
  );
}
