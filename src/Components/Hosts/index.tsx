import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';
import BasicHost from '../../Services/game/entities/hosts/basic';

type Props = {
  data: BasicHost[];
  navigation: any;
}

const s = StyleSheet.create({
	main: {
    paddingTop: 3,
  },
  host: {
    flexDirection: 'row',
    alignItems: 'center',
    height: Metrics.BtnHeight,
    backgroundColor: Colors.PrimaryDark1,
    padding: Metrics.PaddingXSM,
    borderRadius: Metrics.BorderRadiusSM,
    marginBottom: 3,
  },
  icon: {
    height: 16,
    width: 16,
  },
  text: {
    color: Colors.Primary,
    fontSize: Metrics.FontSizeSM,
    marginLeft: 8,
  }
});

export default ({
  data,
  navigation,
}: Props) => {
	return (
		<View style={s.main}>
      {data.map((host: BasicHost) => (
        <TouchableOpacity
          style={s.host}
          onPress={() => navigation.navigate('Host', { hostName: host.name })}
          key={host.name}
        >
           <Image style={s.icon} source={require('../../assets/images/server.png')} />
           <Text style={s.text}>{host.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
	);
}
