import { showMessage as show, hideMessage as hide, MessageOptions } from 'react-native-flash-message';

export const showMessage = (p: MessageOptions) => {
  return show({
    ...p,
    duration: p.duration || 2500,
  });
}

export const hideMessage = hide;
