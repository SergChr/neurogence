import React from 'react';
import { View } from 'react-native';

import Instruction from './Item';
import FlatList from '../../../../Components/FlatList';
import s from './styles';
import Text from '../../../../Components/Text';
import Button, { ButtonTypes } from '../../../../Components/Button';
import Modal from './modal';
import { Script, ScriptItem, ScriptTypes } from '../../../../Services/game/entities/bot/interface';
import scripts from '../../../../Services/game/entities/bot/scripts';
import { ActionTypes, ScriptUpdateInstructions } from '../../interface';

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
  modalVisible: boolean;
  currentScript: string | null;
};

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state = {
    mode: null,
    indexes: null,
    modalVisible: false,
    currentScript: null,
  }

  requestEdit = () => {
    this.setState({ mode: Modes.Edit, modalVisible: true });
  }

  delete = () => {

  }

  addItemToRow = () => {

  }

  toggleModalVisibility = () => this.setState(({ modalVisible }) => ({ modalVisible: !modalVisible }));

  addScript = () => {
    this.setState({ mode: Modes.Add, modalVisible: true });
  }

  pickValue = (scriptItem: ScriptItem) => {
    const { mode } = this.state;
    let actionType = ActionTypes.Add;
    if (mode === Modes.Edit) {
      actionType = ActionTypes.Update;
    }
    // TODO: add delete action type

    const data = {
      actionType,
      // TODO: if actionType === update
      // index:
      // secondaryIndex:
      payload: scriptItem,
    };
    this.props.onUpdate(data);
    this.setState({ modalVisible: false, mode: null, currentScript: null });
  }

  render() {
    const { data = [] } = this.props;
    const { modalVisible, currentScript } = this.state;
    return (
      <View style={s.container}>
        {modalVisible && (
          <Modal
            value={currentScript}
            values={scripts}
            onClose={this.toggleModalVisibility}
            onPick={this.pickValue}
          />
        )}

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
