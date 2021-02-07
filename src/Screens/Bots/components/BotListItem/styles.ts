import { StyleSheet } from 'react-native';

import { Colors, Metrics } from '../../../../Styles/enums';

export default StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: Colors.SecondaryDark,
    borderRadius: Metrics.BorderRadiusSM,
    marginBottom: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftPart: {
    flex: 1,
    padding: Metrics.PaddingXSM,
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightPart: {
    marginLeft: 14,
    marginRight: 6,
    flexDirection: 'row',
  },
  nameBlock: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nameText: {
    fontSize: Metrics.FontSizeSM1,
    color: Colors.Grey,
    marginRight: 6,
  },
  icon: {
    height: 12,
    width: 12,
  },
  infoBlock: {
    flex: 4,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  infoHelp: {
    color: Colors.DarkGrey,
    fontSize: Metrics.FontSizeXSM,
  },
  info: {
    color: Colors.Grey,
    fontSize: Metrics.FontSizeSM,
  },
  modal: {
    width: '60%',
    flex: 1,
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: Colors.Black,
    flex: 1,
    borderRadius: Metrics.BorderRadiusSM,
    padding: 15,
  },
  logItem: {
    fontSize: Metrics.FontSizeXSM,
    color: Colors.Grey,
  }
});
