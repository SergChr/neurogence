import React from 'react';
import {
  StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { Colors, Metrics } from '../../../../Styles/enums';
import Text from '../../../../Components/Text';

type Props = {
  text: string;
  onPress: () => void;
}

const s = StyleSheet.create({
  button: {
		height: Metrics.BtnHeight,
		borderWidth: 2,
		borderColor: Colors.Primary,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30,
		borderRadius: Metrics.BorderRadiusSM,
	},
	text: {
		color: Colors.Primary,
		fontWeight: '700',
		fontSize: 20,
	},
});

export default ({ text, onPress }: Props) => {
	return (
		<TouchableOpacity
			style={s.button}
			onPress={onPress}
		>
			<Text style={s.text}>{text}</Text>
		</TouchableOpacity>
	);
}
