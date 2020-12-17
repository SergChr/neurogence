import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Colors } from '../../Styles/enums';
import Button, { ButtonTypes } from '../../Components/Button';
import OutputLog from '../../Components/OutputLog';
import useStore from '../../Store';

const s = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.Background,
  },
  row: {
    flexDirection: 'row',
    height: '50%'
  },
  output: {
    flex: 4,
    marginRight: 8,
  },
  buttons: {
    flex: 2,
  }
});

export default () => {
  const log = useStore(s => s.log);
  const writeLog = useStore(s => s.writeLog);

  return (
    <View style={s.container}>
      <View style={s.row}>
        <View style={s.output}>
          <OutputLog data={log} />
        </View>
        <View style={s.buttons}>
          <Button type={ButtonTypes.Primary} text="Scan network" />
        </View>
      </View>
    </View>
  );
}
