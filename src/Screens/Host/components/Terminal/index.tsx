import React from 'react';
import {
  StyleSheet,
	Text,
	View,
} from 'react-native';

import Host from '../../../../Services/game/entities/hosts/basic';
import { Colors, Metrics } from '../../../../Styles/enums';

type Props = {
  host: Host;
}

const s = StyleSheet.create({
  box: {
    backgroundColor: Colors.PrimaryLight,
    flex: 1,
    borderRadius: Metrics.BorderRadiusSM,
  },
});

export default ({
  host,
}: Props) => {
	return (
		<View style={s.box}>
      
    </View>
	);
}
