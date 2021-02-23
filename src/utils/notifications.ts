import { showMessage as show, hideMessage as hide, MessageOptions, MessageType } from 'react-native-flash-message';
import { Colors } from '../Styles/enums';

export const showMessage = (p: MessageOptions) => {
  return show({
    ...p,
    duration: p.duration || 2500,
  });
}

export const showTerminalMessage = (
  title: string,
  description: string,
  type: MessageType = 'warning',
) => show({
  message: title,
  description,
  duration: 16000,
  backgroundColor: Colors.PrimaryBlack,
  color: Colors.Grey,
  position: 'bottom',
  titleStyle: {
    color: type === 'warning' ? Colors.Orange : Colors.Red,
  }
});

export const hideMessage = hide;
