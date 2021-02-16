import { StyleSheet } from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerContainer: {
    padding: 10,
    flex: 1,
  },
  aboutSection: {
    marginBottom: 10,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.Grey,
  },
  aboutText: {
    color: Colors.GreyDark,
    fontSize: Metrics.FontSizeSM,
  },
  howToPlayBtn: {
    width: '30%'
  },
  helpSection: {
    padding: 15,
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpTitle: {
    fontSize: Metrics.FontSizeSM1,
    textTransform: 'uppercase',
    color: Colors.Primary,
  },
  helpInfoText: {
    fontSize: Metrics.FontSizeSM,
    color: Colors.Grey,
  }
});
