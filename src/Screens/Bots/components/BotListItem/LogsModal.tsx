import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import FlatList from '../../../../Components/FlatList';
import Text from '../../../../Components/Text';
import s from './styles';

type Props = {
  data?: string[];
  onClose: () => void;
};

export default React.memo(({
  data = [],
  onClose,
}: Props) => {
  return (
    <Modal
      isVisible
      style={s.modal}
      onBackdropPress={onClose}
    >
      <View style={s.modalView}>
        <FlatList
          removeClippedSubviews
          maxToRenderPerBatch={5}
          updateCellsBatchingPeriod={500}
        >
          {data.length === 0 && (
            <View>
              <Text style={s.logItem}># No logs so far. The bot is searching for target hosts (if "All bots" is &gt; 0)</Text>
              <Text style={s.logItem}># Come back soon</Text>
            </View>
          )}
          {data.map((log, i) => (
            <Text key={i} style={s.logItem}>{log}</Text>
          ))}
        </FlatList>
      </View>
    </Modal>
  );
});
