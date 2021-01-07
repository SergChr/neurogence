export interface Cursor {
  name: string;
  items: string[];
  text?: string;
  page?: number;
  totalPages?: number;
  messageType?: MessageTypes;
}

export enum MessageTypes {
  Regular,
  Verbose,
  Warn,
}

interface Option {
  value: string;
  description: string;
}

export interface LogItem {
  text: string;
  options: Option[];
  type?: MessageTypes,
}
