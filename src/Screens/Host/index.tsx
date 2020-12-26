import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Colors } from '../../Styles/enums';
import Button, { ButtonTypes } from '../../Components/Button';
import TopPanel from '../../Components/TopPanel';
import {  gameStore } from '../../Store';
import commonStyle from '../../Styles/common';

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
  },
});

export default ({ route }: any) => {
  return (
    <View style={commonStyle.screen}>
      <TopPanel text={`Host: ${route.params.hostName}`} />
      <Text>Host screen</Text>
    </View>
  );
}
