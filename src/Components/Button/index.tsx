import React from 'react';
import {
  StyleSheet,
	TouchableOpacity,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';
import Text from '../Text';

export enum ButtonTypes {
	Primary = 'primary',
	Secondary = 'secondary',
	Helper = 'helper',
}

type Props = {
	type: ButtonTypes,
	text: string,
	onPress?: () => void;
	disabled?: boolean;
	style?: Record<string, string | number>;
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
	helper: {
		minWidth: 40,
		backgroundColor: Colors.GreyDark,
	},
});

export default ({
	type,
	text,
	onPress,
	disabled = false,
	style = {},
}: Props) => {
	const buttonStyle = s[type];
	return (
		<TouchableOpacity
			style={{...s.common, ...buttonStyle, ...(disabled && s.disabled), ...style}}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={disabled && s.disabledText || {}}>{text}</Text>
		</TouchableOpacity>
	);
}
