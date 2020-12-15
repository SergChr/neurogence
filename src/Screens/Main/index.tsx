import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Colors } from '../../Styles/enums';
import Button, {ButtonTypes} from '../../Components/Button';

export default () => (
	<View style={s.container}>
		<Text>Main screen</Text>
    <Button type={ButtonTypes.Primary} text="DDDDD" />
	</View>
);

const s = StyleSheet.create({
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
