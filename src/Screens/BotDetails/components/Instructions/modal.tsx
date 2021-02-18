import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

import { ScriptGroups, ScriptItem, ScriptTypes } from '../../../../Services/game/entities/bot/interface';
import Text from '../../../../Components/Text';
import FlatList from '../../../../Components/FlatList';
import s from './styles';
import {
  getGroupDescription,
  getGroupColors,
} from './utils';

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

type Group = {
  group: ScriptGroups,
  items: ScriptItem[];
};
type GroupProps = {
  group: Group;
  onPick: (v: ScriptItem) => void;
  value: string | null;
};

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

const Group = (p: GroupProps) => {
  const { text, background } = getGroupColors(p.group.group);
  const title = getGroupDescription(p.group.group);

  return (
    <View style={{...s.groupSection, backgroundColor: background}}>
      <Text style={{...s.groupTitle, color: text }}>
        {title}
      </Text>
      <FlatList disableScrollToEnd>
        {p.group.items.map((s, i) => (
          <Item
            key={i}
            value={s.type}
            description={s.description}
            shouldBeLast={s.shouldBeLast}
            highlighted={s.type === p.value}
            onPick={() => p.onPick(s)}
          />
        ))}
      </FlatList>
    </View>
  );
}

const EditingModal = ({
  value,
  values,
  onClose,
  onPick,
}: Props) => {
  const groups: Group[] = [];
  values.forEach(script => {
    if (script.group) {
      const i = groups.findIndex(g => g.group === script.group);
      if (i === -1) {
        groups.push({
          group: script.group,
          items: [script],
        });
      } else {
        groups[i].items.push(script);
      }
    }
  });

  return (
    <Modal
      isVisible
      style={s.modal}
      onBackdropPress={onClose}
    >
      <View style={s.modalView}>
        <FlatList disableScrollToEnd>
          {groups.map((group, i) => (
            <Group
              key={i}
              group={group}
              onPick={onPick}
              value={value}
            />
          ))}
        </FlatList>
      </View>
    </Modal>
  );
}

export default memo(EditingModal);
