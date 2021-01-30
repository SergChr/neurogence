import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { Colors } from '../../Styles/enums';
import s from './styles';

type Value = {
  label: string;
  value: string | number | undefined;
}

type Props = {
  value?: string | number;
  style?: object;
  onChange: (v: string) => void;
  values: Value[];
};

export default React.memo(({
  value,
  style = {},
  onChange,
  values = [],
}: Props) =>(
  <View style={s.picker}>
    <Picker
      selectedValue={value}
      style={{...style}}
      onValueChange={onChange}
      dropdownIconColor={Colors.Primary}
      itemStyle={s.item}
    >
      {values.map(({ label, value }) => (
        <Picker.Item
          key={label}
          label={label}
          value={value}
          color={Colors.Primary}
        />
      ))}
    </Picker>
  </View>
));
