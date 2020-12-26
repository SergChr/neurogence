import {
  StyleSheet,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Colors.Background,
    flexDirection: 'row',
  },
  buttons: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  terminal: {
    flex: 1.5,
  },
});
