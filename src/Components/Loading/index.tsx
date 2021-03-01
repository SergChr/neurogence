import React from 'react';
import { View } from 'react-native';

import Text from '../Text';
import s from './style';
import common from '../../Styles/common';

export default () => (
  <View style={{...common.screen, ...s.main}}>
    <View style={s.center}>
      <Text style={s.text}>Booting...</Text>
    </View>
  </View>
);
