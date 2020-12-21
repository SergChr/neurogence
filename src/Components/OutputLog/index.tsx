import React, { useEffect } from 'react';
import {
  Text,
  FlatList,
  View,
} from 'react-native';

import { Metrics } from '../../Styles/enums';
import { LogEntry, LogEntryTypes } from '../../Store/interfaces';
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

const ITEM_HEIGHT = 100;

export default ({
  data,
}: Props) => {
  let logElement: FlatList<LogEntry>;
  useEffect(() => {
    logElement.scrollToEnd();
  });

	return (
    <FlatList
      ref={(e) => { logElement = e! }}
      style={s.container}
      data={data}
      renderItem={({ item: { type, text } }) => (
        <Message type={type}>
          {text}
        </Message>
      )}
      keyExtractor={i => i.createdAt.toString() + i.text}
      getItemLayout={(data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
      )}
      ListFooterComponent={<View style={{ marginBottom: Metrics.PaddingXSM }} />}
    >
    </FlatList>
	);
}
