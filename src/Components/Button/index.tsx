import React from 'react';
import {
  StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';

export enum ButtonTypes {
	Primary = "primary",
	Secondary = "secondary",
}

type Props = {
	type: ButtonTypes,
	text: string,
	onPress?: () => void;
}

const s = StyleSheet.create({
	common: {
		height: Metrics.BtnHeight,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Metrics.BorderRadiusSM,
	},
  primary: {
    backgroundColor: Colors.Primary,
	},
	secondary: {
    backgroundColor: Colors.Background,
  },
});

export default ({
	type,
	text,
	onPress,
}: Props) => {
	const buttonStyle = type === ButtonTypes.Primary ? s.primary : s.secondary;
	return (
		<TouchableOpacity
			style={{...s.common, ...buttonStyle}}
			onPress={onPress}
		>
			<Text>{text}</Text>
		</TouchableOpacity>
	);
}
