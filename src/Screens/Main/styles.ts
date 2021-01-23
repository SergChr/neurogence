import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  innerContainer: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
    flex: 1,
    height: '100%',
  },
  output: {
    flex: 2,
  },
  buttons: {
    flex: 1,
    marginLeft: 6,
    marginTop: 6,
  },
  hosts: {
    marginTop: 6,
    flex: 2,
  },
  infoPanel: {
    flex: 1,
    marginLeft: 6,
  },
  widthSM: {
    flex: 1,
  },
  widthM: {
    flex: 2,
  },
});
