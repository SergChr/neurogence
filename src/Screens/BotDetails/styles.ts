import { StyleSheet } from 'react-native';
import { Colors, Metrics } from '../../Styles/enums';

export default StyleSheet.create({
  innerContainer: {
    flexDirection: 'row',
  },
  instructions: {
    margin: 5,
    flex: 1,
  },
  rightBlock: {
    flex: 1,
    margin: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    justifyContent: 'space-between',
  },
  rightBlockText: {
    flex: 0.5,
    color: Colors.Grey
  },
  textInput: {
    backgroundColor: Colors.SecondaryDark,
    borderRadius: Metrics.BorderRadiusSM,
    color: Colors.Primary,
    // TODO: fix (the input isn't well-aligned with Picker)
    paddingLeft: 10,
    marginLeft: 7,
    flex: 1,
    fontSize: Metrics.FontSizeSM1,
  },
  leftInfoText: {
    color: Colors.PrimaryBtn,
  },
  rowInfo: {
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 10,
  }
});
