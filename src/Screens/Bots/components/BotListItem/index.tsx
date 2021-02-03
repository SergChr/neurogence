import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';

import Text from '../../../../Components/Text';
import Button, { ButtonTypes } from '../../../../Components/Button';
import s from './styles';

type Props = {
  name: string;
  all: number;
  enslaved: number;
  onPick: () => void;
  onRelease: () => void;
};

export default ({ name, all, enslaved, onPick, onRelease }: Props) => (
  <View style={s.block}>
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
        type={ButtonTypes.Primary}
        text="Release"
        onPress={onRelease}
      />
    </View>
  </View>
);
