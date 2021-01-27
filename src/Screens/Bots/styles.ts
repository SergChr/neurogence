import { StyleSheet } from 'react-native';

import { Colors } from '../../Styles/enums';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerContainer: {
    padding: 10,
    flex: 1,
  },
  emptySection: {
    padding: 50,
    alignSelf: 'center',
    alignContent: 'center',
  },
  emptyText: {
    color: Colors.DarkGrey,
    marginBottom: 10,
  },
});
