import {
  StyleSheet,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';
import { LogEntryTypes } from '../../Store/interfaces';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PrimaryLight,
    paddingTop: Metrics.PaddingXSM,
    paddingBottom: Metrics.PaddingXSM,
    borderRadius: Metrics.BorderRadiusSM,
  },
  log: {
    paddingLeft: Metrics.PaddingXSM,
    paddingRight: Metrics.PaddingXSM,
    marginBottom: Metrics.PaddingXSM,
    fontSize: Metrics.FontSizeSM,
  },
  [LogEntryTypes.Trace]: {
    color: Colors.DarkGrey,
  },
  [LogEntryTypes.Info]: {
    color: Colors.Grey,
  },
  [LogEntryTypes.Warn]: {
    color: Colors.Orange,
  },
  [LogEntryTypes.Error]: {
    color: Colors.Red,
    fontWeight: '800',
  },
});