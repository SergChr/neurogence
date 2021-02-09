import React from 'react';
import { View } from 'react-native';

import Instruction from './Item';
import FlatList from '../../../../Components/FlatList';
import s from './styles';
import Text from '../../../../Components/Text';
import Button, { ButtonTypes } from '../../../../Components/Button';
import Modal from './modal';
import { Script, ScriptItem } from '../../../../Services/game/entities/bot/interface';
import scripts from '../../../../Services/game/entities/bot/scripts';
import { ActionTypes, ScriptUpdateInstructions } from '../../interface';

type Props = {
  data: Script[];
  onUpdate: (p: ScriptUpdateInstructions) => void;
  canAddMore: boolean;
};

enum Modes {
  Add = 'add',
  Edit = 'edit',
};

type State = {
  mode: Modes | null;
  indexes: number[] | null;
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

  requestEdit = (i: number, ii?: number) => {
    const indexes = [i];
    if (ii) {
      indexes.push(ii);
    }
    this.setState({ mode: Modes.Edit, modalVisible: true, indexes });
  }

  delete = (i: number, ii?: number) => {
    this.props.onUpdate({
      index: i,
      secondaryIndex: ii,
      actionType: ActionTypes.Delete,
    });
  }

  addItemToRow = (i: number) => {
    this.setState({ mode: Modes.Add, modalVisible: true, indexes: [i] });
  }

  toggleModalVisibility = () => this.setState(({ modalVisible }) => ({ modalVisible: !modalVisible }));

  addScript = () => {
    this.setState({ mode: Modes.Add, modalVisible: true });
  }

  pickValue = (scriptItem: ScriptItem) => {
    const { mode, indexes } = this.state;
    let actionType = ActionTypes.Add;
    if (mode === Modes.Edit) {
      actionType = ActionTypes.Update;
    }
    const data = {
      actionType,
      index: indexes?.[0],
      secondaryIndex: indexes?.[1],
      payload: scriptItem,
    };
    this.props.onUpdate(data);
    this.setState({ modalVisible: false, mode: null, currentScript: null, indexes: [] });
  }

  render() {
    const { data = [], canAddMore } = this.props;
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
                          onEdit={() => this.requestEdit(index, i)}
                          onDelete={() => this.delete(index, i)}
                        />
                        {hasOrSeparator && <Text style={s.or}>OR</Text>}
                        {hasAddButton && (
                          <Button
                            style={s.addButton}
                            text="+"
                            type={ButtonTypes.Primary}
                            onPress={() => this.addItemToRow(index)}
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
                    onEdit={() => this.requestEdit(index)}
                    onDelete={() => this.delete(index)}
                  />
                </View>
              );
            }
          })}
        </FlatList>
        <Button
          disabled={!canAddMore}
          type={ButtonTypes.Primary}
          text="Add instruction"
          onPress={this.addScript}
        />
      </View>
    );
  }
}
