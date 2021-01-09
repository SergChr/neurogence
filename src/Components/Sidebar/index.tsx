import { useRoute } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';

import { Colors } from '../../Styles/enums';

type Props = {
  availableItems?: number;
  navigation: any;
}

const s = StyleSheet.create({
  main: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: Colors.Secondary,
  },
  menuItem: {
    padding: 12,
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 8,
  },
  icon: {
    height: 26,
    width: 26,
  },
  activeLink: {
    backgroundColor: Colors.SecondaryDark,
  },
});

const Img = ({ src }: any) =>
  <Image style={s.icon} source={src} />;

export default ({
  availableItems = 1,
  navigation,
}: Props) => {
  const MenuItem = ({ to, icon }: any) => {
    const isActive = useRoute().name === to;
    return (
      <TouchableOpacity
        style={{
          ...s.menuItem,
          ...(isActive ? s.activeLink : {}),
        }}
        disabled={isActive}
        onPress={() => navigation.navigate(to)}
      >
        <Img src={icon} />
      </TouchableOpacity>
    );
  }

	return (
    <View style={s.main}>
      <MenuItem
        to='Home'
        icon={require('../../assets/images/terminal.png')}
      />

      <MenuItem
        to='Dashboard'
        icon={require('../../assets/images/gauge.png')}
      />
    </View>
  )
}
