import React, { useEffect } from 'react';
import {
  StyleSheet,
	Text,
  View,
  FlatList,
} from 'react-native';

import { Colors, Metrics } from '../../../../Styles/enums';

interface Option {
  value: string;
  description: string;
}

export enum MessageTypes {
  Regular,
  Info,
}

interface LogItem {
  text: string;
  options?: Option[];
  type?: MessageTypes,
}

type Props = {
  items?: LogItem[];
}

const s = StyleSheet.create({
  box: {
    backgroundColor: Colors.PrimaryLight,
    flex: 1,
    borderRadius: Metrics.BorderRadiusSM,
    padding: Metrics.PaddingXSM,
  },
  title: {
    color: Colors.Grey,
    fontSize: 14,
  },
  option: {
    color: Colors.Grey,
    fontSize: 12,
  },
  infoText: {
    color: Colors.DarkGrey,
  },
  item: {
    marginBottom: 5,
  },
});

const ITEM_HEIGHT = 100;

const getStyleForText = (t: MessageTypes): object => {
  if (t === MessageTypes.Regular) {
    return s.title;
  }

  return s.infoText;
}

export default ({
  items = [],
}: Props) => {
	let logElement: FlatList<LogItem>;
  useEffect(() => {
    logElement.scrollToEnd();
  });

	return (
    <FlatList
      ref={(e) => { logElement = e! }}
      style={s.box}
      data={items}
      renderItem={({ item: { text, options = [], type = MessageTypes.Regular } }) => (
        <View key={new Date() + text} style={s.item}>
          <Text style={getStyleForText(type)}>
            {text}
          </Text>
          {options.map((o) => (
            <Text style={s.option} key={o.value}>
              {o.value}) {o.description}
            </Text>
          ))}
        </View>
      )}
      keyExtractor={i => i.text + new Date()}
      getItemLayout={(data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
      )}
      ListFooterComponent={<View style={{ marginBottom: Metrics.PaddingXSM }} />}
    >
    </FlatList>
	);
}
