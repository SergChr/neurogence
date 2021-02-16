import React from 'react';
import {
  StyleSheet,
	Pressable,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';
import Text from '../Text';

export enum PressableTypes {
	Primary = 'primary',
	Secondary = 'secondary',
	Danger = 'danger',
}

type Props = {
	type: PressableTypes,
	text: string,
	onPress?: () => void;
	disabled?: boolean;
	style?: Record<string, string | number>;
	pressDelay?: number;
	onShortPress?: () => void;
}

const s = StyleSheet.create({
	common: {
		height: Metrics.BtnHeight,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Metrics.BorderRadiusSM,
		paddingRight: 12,
		paddingLeft: 12,
	},
  primary: {
		minWidth: 40,
    backgroundColor: Colors.Primary,
	},
	secondary: {
    backgroundColor: Colors.Background,
	},
	disabled: {
		backgroundColor: Colors.Background,
		borderColor: Colors.Secondary,
		borderWidth: 2,
	},
	disabledText: {
		color: Colors.Secondary,
	},
	danger: {
		minWidth: 40,
		backgroundColor: Colors.Red,
	},
	pressed: {
		backgroundColor: 'red',
	},
});

export default ({
	type,
	text,
	onPress,
	disabled = false,
	style = {},
	pressDelay = 700,
	onShortPress,
}: Props) => {
	const buttonStyle = s[type];
	return (
		<Pressable
			onPress={onShortPress}
			onLongPress={onPress}
			delayLongPress={pressDelay}
			disabled={disabled}
			style={({ pressed }) => {
				return [
					s.common,
					buttonStyle,
					disabled && s.disabled,
					style,
					pressed && s.pressed,
				]
			}}
		>
			<Text>{text}</Text>
		</Pressable>
	);
}
