import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Text from '../../../../Components/Text';
import Button, { ButtonTypes } from '../../../../Components/Button';
import LogsModal from './LogsModal';
import s from './styles';

type Props = {
  name: string;
  all: number;
  enslaved: number;
  onPick: () => void;
  onRelease: () => void;
  removeOne: () => void;
  logs?: string[];
  canRelease: boolean;
  canRemove: boolean;
};

export default React.memo(({
  name,
  all,
  enslaved,
  onPick,
  onRelease,
  logs,
  removeOne,
  canRelease,
  canRemove,
}: Props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <View style={s.block}>
      {isModalVisible && (
        <LogsModal
          data={logs}
          onClose={() => setModalVisible(false)}
        />
      )}
  
      <TouchableOpacity
        style={s.leftPart}
        onPress={onPick}
      >
        <View style={s.nameBlock}>
          <Text style={s.nameText}>{name}</Text>
          <Image style={s.icon} source={require('../../../../assets/images/pencil.png')} />
        </View>
  
        <View style={s.infoBlock}>
          <Text style={s.infoHelp}>Absorbed hosts / All bots</Text>
          <Text style={s.info}>{enslaved} / {all}</Text>
        </View>
      </TouchableOpacity>
  
      <View style={s.rightPart}>
        <Button
          disabled={!canRelease}
          type={ButtonTypes.Primary}
          text="Release"
          onPress={onRelease}
        />

        <Button
          disabled={!canRemove}
          type={ButtonTypes.Danger}
          text="Remove one"
          onPress={removeOne}
          style={{ marginLeft: 10 }}
        />
  
        <Button
          style={{ marginLeft: 10 }}
          type={ButtonTypes.Helper}
          text="Logs"
          onPress={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
});
