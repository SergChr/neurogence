import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

import { Colors, Metrics } from '../../Styles/enums';
import Text from '../Text';
import Localhost, { SkillNames } from '../../Services/game/entities/hosts/localhost';

const Img = ({ src }: any) =>
  <Image style={s.icon} source={src} />;

const s = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    borderColor: Colors.SecondaryDark,
    borderWidth: 2,
    borderRadius: Metrics.BorderRadiusSM,
    padding: 12,
  },
  icon: {
    width: 12,
    height: 12,
    marginRight: 6,
  },
  item: {
    flexDirection: 'row',
    marginBottom: 4,
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
    alignItems: 'center',
  },
  infoText: {
    color: Colors.PrimaryDark2,
    marginBottom: 2,
  },
});

type Props = {
  data: Localhost;
  full: boolean;
}

type MetricProps = {
  icon: any;
  text: string;
  value: string | number;
}

const Metric = ({ icon, text, value }: MetricProps) => (
  <View style={s.item}>
    <View style={s.leftHand}>
      <Img src={icon} />
      <Text style={s.metricText}>{text}</Text>
    </View>
    <Text style={s.metricValue}>{value}</Text>
  </View>
);

const format = (n: number = 0) => {
  if (n < 1) {
    return Math.round(n * 10000) / 10000;
  } else if (n < 1001) {
    return Math.round(n * 10) / 10;
  } else if (n < 1000000) {
    return `${Math.trunc(n) / 1000}k`;
  }
  return Math.trunc(n).toExponential();
};

export default ({ data: host, full }: Props) => {
  if (!host) {
    return null;
  }

  return (
    <View style={s.container}>
      <Metric
        icon={require('../../assets/images/speed.png')}
        text='TFLOPS'
        value={format(Localhost.TFLOPS(host))}
      />

      <Metric
        icon={require('../../assets/images/exploit.png')}
        text='Exploit level'
        value={host.exploitVersion}
      />

      {full &&
        <View>
          <Text style={s.infoText}>Skills</Text>

          <Metric
            icon={require('../../assets/images/math.png')}
            text='Math'
            value={format(host.skills[SkillNames.Math])}
          />

          <Metric
            icon={require('../../assets/images/language.png')}
            text='NLP'
            value={format(host.skills[SkillNames.NLP])}
          />

          <Metric
            icon={require('../../assets/images/programming.png')}
            text='Programming'
            value={format(host.skills[SkillNames.Programming])}
          />
        </View>
      }
    </View>
  );
}
