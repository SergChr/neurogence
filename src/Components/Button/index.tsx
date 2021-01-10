import React from 'react';
import {
  StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';
import Text from '../Text';

export enum ButtonTypes {
	Primary = "primary",
	Secondary = "secondary",
}

type Props = {
	type: ButtonTypes,
	text: string,
	onPress?: () => void;
	disabled?: boolean;
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
	disabled: {
		backgroundColor: Colors.Background,
		borderColor: Colors.Secondary,
		borderWidth: 2,
	},
	disabledText: {
		color: Colors.Secondary,
	},
});

export default ({
	type,
	text,
	onPress,
	disabled = false,
}: Props) => {
	const buttonStyle = type === ButtonTypes.Primary ? s.primary : s.secondary;
	return (
		<TouchableOpacity
			style={{...s.common, ...buttonStyle, ...(disabled && s.disabled)}}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={disabled && s.disabledText || {}}>{text}</Text>
		</TouchableOpacity>
	);
}
