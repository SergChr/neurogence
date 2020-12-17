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
  },
  log: {
    marginLeft: Metrics.PaddingXSM,
    marginBottom: Metrics.PaddingXSM,
  },
  [LogEntryTypes.Trace]: {
    color: Colors.Grey,
  },
  [LogEntryTypes.Info]: {
    color: Colors.Grey,
  },
  [LogEntryTypes.Warn]: {
    color: Colors.Grey,
  },
  [LogEntryTypes.Error]: {
    color: Colors.Grey,
  },
});