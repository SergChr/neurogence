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
  modal: {
    width: '60%',
    flex: 1,
    alignSelf: 'center'
  },
  modalView: {
    backgroundColor: Colors.PrimaryLight,
    flex: 1,
    borderRadius: Metrics.BorderRadiusSM,
    padding: 15,
  },
  modalList: {},
  modalItem: {
    marginBottom: 8,
    padding: 8,
    backgroundColor: Colors.PrimaryDark2,
    borderRadius: Metrics.BorderRadiusSM,
  },
  modalItemHighlighted: {
    backgroundColor: Colors.Primary,
  },
  modalItemTitle: {
    color: Colors.Grey,
    fontWeight: 'bold',
  },
  modalItemDescription: {
    fontSize: Metrics.FontSizeXSM,
    color: Colors.GreyDark
  },
  modalItemWarn: {
    fontSize: Metrics.FontSizeXSM,
    color: Colors.Orange,
  },
});
