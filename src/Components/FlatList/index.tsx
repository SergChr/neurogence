import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import { Metrics } from '../../Styles/enums';

type Props = {
  children: Element[];
  style?: Record<string, string | number>;
}

const ITEM_HEIGHT = 155;

const getLayoutOffset = (h: number[], i: number) => {
  const offset = h.slice(0, i + 1).reduce((a, c) => a + c, 0) || 0;
  return offset;
}

export default ({
  children = [],
  style,
}: Props) => {
	let elem: FlatList<Element>;
  const itemHeights: number[] = [];

	return (
    <FlatList
      ref={(e) => { elem = e! }}
      style={style}
      data={children}
      renderItem={({ item, index }) => (
        <View
          key={index}
          onLayout={object => {
            itemHeights[index] = object.nativeEvent.layout.height;
          }}
        >
          {item}
        </View>
      )}
      keyExtractor={(el, i) => i.toString()}
      getItemLayout={(data, index) => {
        if (itemHeights.length < 1) {
          return { length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index };
        }
        return { length: itemHeights[index] || 0, offset: getLayoutOffset(itemHeights, index), index };
      }}
      ListFooterComponent={<View style={{ marginBottom: Metrics.PaddingXSM }} />}
      onContentSizeChange={() => elem.scrollToEnd()}
    >
    </FlatList>
	);
}
