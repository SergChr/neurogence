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
}

export default ({
	type,
	text,
}: Props) => {
	const buttonStyle = type === ButtonTypes.Primary ? s.primary : s.secondary;
	return (
		<TouchableOpacity style={{...s.common, ...buttonStyle}}>
			<Text>{text}</Text>
		</TouchableOpacity>
	);
}

const s = StyleSheet.create({
	common: {
		// padding: Metrics.PaddingSM,
		height: Metrics.BtnHeight,
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white'
	},
  primary: {
    backgroundColor: Colors.PrimaryBtn,
	},
	secondary: {
    backgroundColor: Colors.Background,
  },
});
