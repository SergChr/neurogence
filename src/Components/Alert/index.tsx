import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import FlashMessage from 'react-native-flash-message';

const s = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center'
  },
  text: {
    textAlign: 'center',
  }
});

export default memo(() => (
  <FlashMessage
    position='top'
    style={s.main}
    titleStyle={s.text}
  />
));
