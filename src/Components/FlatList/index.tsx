import React, { useCallback } from 'react';
import {
  View,
  FlatList,
} from 'react-native';

import { Metrics } from '../../Styles/enums';

type Props = {
  children: Element[];
  style?: Record<string, string | number>;
  horizontal?: boolean;
  separator?: any;
  disableScrollToEnd?: boolean;
  removeClippedSubviews? :boolean;
  maxToRenderPerBatch?: number;
  updateCellsBatchingPeriod?: number;
}

const getLayoutOffset = (h: number[], i: number) => {
  const offset = h.slice(0, i + 1).reduce((a, c) => a + c, 0) || 0;
  return offset;
}

export default ({
  children = [],
  style,
  horizontal = false,
  separator,
  disableScrollToEnd = false,
  removeClippedSubviews = false,
  maxToRenderPerBatch,
  updateCellsBatchingPeriod,
}: Props) => {
	let elem: FlatList<Element>;
  const itemSizes: number[] = [];
  const ITEM_SIZE = horizontal ? 600 : 155;

  const renderItem = ({ item, index }: any) => (
    <View
      key={index}
      onLayout={object => {
        if (horizontal) {
          itemSizes[index] = object.nativeEvent.layout.width;
        } else {
          itemSizes[index] = object.nativeEvent.layout.height;
        }
      }}
    >
      {item}
    </View>
  );

	return (
    <FlatList
      ref={(e) => { elem = e! }}
      style={style}
      data={children}
      renderItem={renderItem}
      keyExtractor={(el, i) => i.toString()}
      getItemLayout={(data, index) => {
        if (itemSizes.length < 1) {
          return { length: ITEM_SIZE, offset: ITEM_SIZE * index, index };
        }
        return { length: itemSizes[index] || 0, offset: getLayoutOffset(itemSizes, index), index };
      }}
      ListFooterComponent={<View style={{ marginBottom: Metrics.PaddingXSM }} />}
      onContentSizeChange={() => {
        if (disableScrollToEnd) {
          return null;
        }
        return !horizontal && elem.scrollToEnd();
      }}
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={separator}
      removeClippedSubviews={removeClippedSubviews}
      maxToRenderPerBatch={maxToRenderPerBatch}
      updateCellsBatchingPeriod={updateCellsBatchingPeriod}
    >
    </FlatList>
	);
}
