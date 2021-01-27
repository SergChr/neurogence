import React from 'react';
import { View } from 'react-native';
import Modal from 'react-native-modal';

import Instruction from './Item';
import FlatList from '../../../../Components/FlatList';
import s from './styles';
import Text from '../../../../Components/Text';
import Button, { ButtonTypes } from '../../../../Components/Button';
import { Script } from '../../../../Services/game/entities/bot/interface';
import { ScriptUpdateInstructions, ActionTypes } from '../../interface';

type Props = {
  data: Script[];
  onUpdate: (p: ScriptUpdateInstructions) => void;
};

enum Modes {
  Add = 'add',
  Edit = 'edit',
};

type State = {
  mode: Modes | null;
  indexes: [number, number?] | null;
};

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    mode: null,
    indexes: null,
  }

  requestEdit = () => {

  }

  delete = () => {

  }

  addItemToRow = () => {

  }

  addScript = () => {

  }

  render() {
    const { data = [] } = this.props;
    const { mode } = this.state;
    return (
      <View style={s.container}>
        {/* <Modal isVisible={true}>
          <View style={{ flex: 1 }}>
            <Text>I am the modal content!</Text>
          </View>
        </Modal> */}

        <FlatList>
          {data.map((item, index) => {
            if (Array.isArray(item)) {
              return (
                <FlatList
                  horizontal
                  key={index}
                >
                  {item.map((script, i) => {
                    const isLast = item.length - 1 === i;
                    const hasAddButton = isLast;
                    const hasOrSeparator = !isLast;
                    return (
                      <View key={`${index}-${i}`} style={{...s.horizontalRow, ...s.marginBottom}}>
                        <Instruction
                          short
                          mainText={script.type}
                          secondaryText={script.thenText}
                          onEdit={() => {}}
                          onDelete={this.delete}
                        />
                        {hasOrSeparator && <Text style={s.or}>OR</Text>}
                        {hasAddButton && (
                          <Button
                            style={s.addButton}
                            text="+"
                            type={ButtonTypes.Helper}
                            onPress={this.addItemToRow}
                          />
                        )}
                      </View>
                    );
                  })}
                </FlatList>
              )
            } else {
              return (
                <View key={index} style={s.marginBottom}>
                  <Instruction
                    mainText={item.type}
                    secondaryText={item.thenText}
                    onEdit={this.requestEdit}
                    onDelete={this.delete}
                  />
                </View>
              );
            }
          })}
        </FlatList>
        <Button
          type={ButtonTypes.Primary}
          text="Add instruction"
          onPress={this.addScript}
        />
      </View>
    );
  }
}
