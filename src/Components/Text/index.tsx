import React from 'react';
import { Text, StyleSheet } from 'react-native';

import c from '../../Config/constants';

type Props = {
  children: Element;
  style?: Record<string, string|number>;
};

const s = StyleSheet.create({
  text: {
    fontFamily: c.FONT_FAMILY.REGULAR,
  },
});

export default ({ children, style }: Props) => (
  <Text style={{ ...style, ...s.text }}>
    {children}
  </Text>
);
