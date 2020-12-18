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
      data={[
        {text: 'Very start!', createdAt: new Date(43255543), type: LogEntryTypes.Info},
        {text: 'Hello how are you?', createdAt: new Date(76586558), type: LogEntryTypes.Info},
        {text: 'Hello how are you?', createdAt: new Date(765658664), type: LogEntryTypes.Warn},
        {text: 'Hello how are you?', createdAt: new Date(7658658), type: LogEntryTypes.Info},
        {text: 'Hello how are you?', createdAt: new Date(758664558), type: LogEntryTypes.Info},
        {text: 'Hello how are you?', createdAt: new Date(65864458), type: LogEntryTypes.Trace},
        {text: 'Hello how are you?', createdAt: new Date(76587968), type: LogEntryTypes.Trace},
        {text: 'Hello how are you?', createdAt: new Date(586005318), type: LogEntryTypes.Error},
      
        {text: 'Hello how are you?', createdAt: new Date(265658664), type: LogEntryTypes.Info},
        {text: 'Hello how are you?', createdAt: new Date(8658658), type: LogEntryTypes.Trace},
        {text: 'Hello how are you?', createdAt: new Date(7018664558), type: LogEntryTypes.Trace},
        {text: 'Hello how are you?', createdAt: new Date(63464458), type: LogEntryTypes.Error},
        {text: 'Almost end', createdAt: new Date(76787968), type: LogEntryTypes.Info},
        {text: 'The END message', createdAt: new Date(503005318), type: LogEntryTypes.Info},
      ]}
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
