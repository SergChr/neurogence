import {
	StyleSheet,
} from 'react-native';

import { Colors } from './enums';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: Colors.Background,
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#20232a",
    borderRadius: 6,
    backgroundColor: "#61dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  }
});
