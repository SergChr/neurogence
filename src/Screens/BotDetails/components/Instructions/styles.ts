import { StyleSheet } from 'react-native';

import { Colors, Metrics } from '../../../../Styles/enums';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.PrimaryLight,
    borderRadius: Metrics.BorderRadiusSM,
    padding: 5,
  },
  horizontalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  marginBottom: {
    marginBottom: 5,
  },
  or: {
    color: Colors.Grey,
    marginLeft: 8,
    marginRight: 8,
  },
  addButton: {
    marginLeft: 8,
  },
});
