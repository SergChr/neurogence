import React from 'react';
import {
  FlatList,
  View,
} from 'react-native';

import { Metrics } from '../../Styles/enums';
import { LogEntry, LogEntryTypes } from '../../Store/interfaces';
import Text from '../Text';
import s from './style';

type Props = {
  data: LogEntry[];
}

const Message = (
  { children, type = LogEntryTypes.Info }: {children: string, type: LogEntryTypes}
) => (
  <Text style={{...s[type], ...s.log}}>
    {children}
  </Text>
);

const getLayoutOffset = (h: number[], i: number) => {
  const offset = h.slice(0, i + 1).reduce((a, c) => a + c, 0) || 0;
  return offset;
}

const ITEM_HEIGHT = 155;

export default ({
  data,
}: Props) => {
  let logElement: FlatList<LogEntry>;
  const itemHeights: number[] = [];

	return (
    <FlatList
      ref={(e) => { logElement = e! }}
      style={s.container}
      data={data}
      renderItem={({ item: { type, text }, index }) => (
        <View onLayout={object => {
          itemHeights[index] = object.nativeEvent.layout.height;
        }}>
          <Message type={type}>
            {text}
          </Message>
        </View>
      )}
      keyExtractor={i => Math.random() + i.text}
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
