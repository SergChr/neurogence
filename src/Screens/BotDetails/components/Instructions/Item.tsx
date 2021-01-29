import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import Text from '../../../../Components/Text';
import { Colors, Metrics } from '../../../../Styles/enums';

const windowWidth = () => Dimensions.get('window').width;

const s = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: Colors.Secondary,
    borderRadius: Metrics.BorderRadiusSM,
  },
  short: {
    minWidth: windowWidth() / 3, // TODO: test on different devices
  },
  left: {
    flex: 4,
    padding: 8,
  },
  mainText: {
    color: Colors.Grey,
  },
  secondaryText: {
    color: Colors.DarkGrey,
    fontSize: Metrics.FontSizeXSM,
  },
  right: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trashIcon: {
    height: 15,
    width: 15,
  },
  editIcon: {
    height: 10,
    width: 10,
    marginLeft: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

type Props = {
  mainText: string;
  secondaryText: string;
  short?: boolean;
  onEdit: () => void;
  onDelete: () => void;
}

export default React.memo(({
  mainText,
  secondaryText,
  short = false,
  onEdit,
  onDelete,
}: Props) => (
  <View style={{...s.item, ...(short && s.short)}}>
    <TouchableOpacity style={s.left} onPress={onEdit}>
      <View style={s.row}>
        <Text style={s.mainText}>{mainText}</Text>
        <Image style={s.editIcon} source={require('../../../../assets/images/pencil.png')} />
      </View>
      <Text style={s.secondaryText}>{secondaryText}</Text>
    </TouchableOpacity>

    <TouchableOpacity style={s.right} onPress={onDelete}>
      <Image style={s.trashIcon} source={require('../../../../assets/images/trash.png')} />
    </TouchableOpacity>
  </View>
));
