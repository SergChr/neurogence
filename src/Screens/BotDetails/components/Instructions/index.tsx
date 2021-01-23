import React from 'react';
import { View } from 'react-native';

import Instruction from './Item';
import FlatList from '../../../../Components/FlatList';
import s from './styles';
import Text from '../../../../Components/Text';
import Button, { ButtonTypes } from '../../../../Components/Button';

type Props = {
  data: any;
};

type State = {};

export default class HostScreen extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  state: State = {}

  componentDidMount() {

  }

  render() {
    const { data = [] } = this.props;
    return (
      <View style={s.container}>
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
                        />
                        {hasOrSeparator && <Text style={s.or}>OR</Text>}
                        {hasAddButton && (
                          <Button
                            style={s.addButton}
                            text="+"
                            type={ButtonTypes.Helper}
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
                  />
                </View>
              );
            }
          })}
        </FlatList>
        <Button
          type={ButtonTypes.Primary}
          text="Add instruction"
        />
      </View>
    );
  }
}
