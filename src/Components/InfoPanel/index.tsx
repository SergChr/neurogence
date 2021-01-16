import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';
import Text from '../Text';
import Localhost from '../../Services/game/entities/hosts/localhost';

const Img = ({ src }: any) =>
  <Image style={s.icon} source={src} />;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: Colors.SecondaryDark,
    borderWidth: 2,
    borderRadius: Metrics.BorderRadiusSM,
  },
  icon: {
    width: 15,
    height: 15,
    marginRight: 6,
  },
  item: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricText: {
    color: Colors.PrimaryBtn,
  },
  metricValue: {
    color: Colors.Grey,
    alignSelf: 'flex-end'
  },
  leftHand: {
    flexDirection: 'row',
  },
});

type Props = {
  data: Localhost;
  full: boolean;
}

export default ({ data: host, full }: Props) => {
  if (!host) {
    return null;
  }
  return (
    <View style={s.container}>
      <View style={s.item}>
        <View style={s.leftHand}>
          <Img src={require('../../assets/images/speed.png')} />
          <Text style={s.metricText}>TFLOPS</Text>
        </View>
        <Text style={s.metricValue}>{host.TFLOPS}</Text>
      </View>

      {full &&
        <View>
          <Text>Skills will be shown here. // TODO:</Text>
        </View>
      }
    </View>
  );
}
