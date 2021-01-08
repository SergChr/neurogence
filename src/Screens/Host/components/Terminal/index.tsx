import React from 'react';
import {
  StyleSheet,
	Text,
  View,
  FlatList,
} from 'react-native';

import { Colors, Metrics } from '../../../../Styles/enums';
import { MessageTypes, LogItem } from '../../../../Services/game/entities/hostTerminal/interfaces';

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

const ITEM_HEIGHT = 155;

const getStyleForText = (t: MessageTypes): object => {
  if (t === MessageTypes.Regular) {
    return s.title;
  }

  return s.infoText;
}

const getLayoutOffset = (h: number[], i: number) => {
  const offset = h.slice(0, i + 1).reduce((a, c) => a + c, 0) || 0;
  return offset;
}

export default ({
  items = [],
}: Props) => {
	let logElement: FlatList<LogItem>;
  const itemHeights: number[] = [];

	return (
    <FlatList
      ref={(e) => { logElement = e! }}
      style={s.box}
      data={items}
      renderItem={({ item: { text, options = [], type = MessageTypes.Regular }, index }) => (
        <View
          key={new Date() + text} style={s.item}
          onLayout={object => {
            itemHeights[index] = object.nativeEvent.layout.height;
          }}
        >
          <Text style={getStyleForText(type)}>
            {text}
          </Text>
          {options.map((o) => (
            <Text style={s.option} key={o.index}>
              {o.index}) {o.description}
            </Text>
          ))}
        </View>
      )}
      keyExtractor={i => i.text + Math.random()}
      getItemLayout={(data, index) => {
        if (itemHeights.length < 1) {
          return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
        }
        return { length: itemHeights[index] || 0, offset: getLayoutOffset(itemHeights, index), index };
      }}
      ListFooterComponent={<View style={{ marginBottom: Metrics.PaddingXSM }} />}
      onContentSizeChange={() => logElement.scrollToEnd()}
    >
    </FlatList>
	);
}
