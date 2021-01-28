import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { ScriptItem, ScriptTypes } from '../../../../Services/game/entities/bot/interface';
import Text from '../../../../Components/Text';
import FlatList from '../../../../Components/FlatList';
import s from './styles';

type Props = {
  value: string | null;
  values: ScriptItem[];
  onClose: () => void;
  onPick: (v: ScriptItem) => void;
}

type ItemProps = {
  value: ScriptTypes;
  description: string;
  shouldBeLast?: boolean;
  highlighted?: boolean;
  onPick: () => void;
}

const Item = ({ value, description, shouldBeLast, highlighted, onPick }: ItemProps) => (
  <TouchableOpacity
    style={{...s.modalItem, ...(highlighted && s.modalItemHighlighted)}}
    onPress={onPick}
  >
    <Text style={s.modalItemTitle}>{value}</Text>
    <Text style={s.modalItemDescription}>{description}</Text>
    {shouldBeLast && (
      <Text style={s.modalItemWarn}>
        Should be the last instruction
      </Text>
    )}
  </TouchableOpacity>
);

export default ({
  value,
  values,
  onClose,
  onPick,
}: Props) => {
  return (
    <Modal
      isVisible
      style={s.modal}
      onBackdropPress={onClose}
    >
      <View style={s.modalView}>
        <FlatList
          disableScrollToEnd 
          style={s.modalList}
        >
          {values.map((s, i) => (
            <Item
              key={i}
              value={s.type}
              description={s.description}
              shouldBeLast={s.shouldBeLast}
              highlighted={s.type === value}
              onPick={() => onPick(values[i])}
            />
          ))}
        </FlatList>
      </View>
    </Modal>
  );
}
