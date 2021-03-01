import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Styles/enums';

export default StyleSheet.create({
  main: {
    backgroundColor: Colors.PrimaryBlack,
    justifyContent: 'center',
    alignItems: 'center',
  },
  center: {
    backgroundColor: Colors.Grey,
    padding: 10,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 4,
  },
  text: {
    color: Colors.Black,
    fontSize: Metrics.FontSizeSM1,
  },
});
