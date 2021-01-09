export interface CursorItem {
  value: string;
  description: string;
}

export interface Cursor {
  name: string;
  items: string[] | CursorItem[];
  text?: string;
  page?: number;
  totalPages?: number;
  messageType?: MessageTypes;
}

export enum MessageTypes {
  Regular,
  Verbose,
  Warn,
  Error,
}

interface Option {
  value?: string;
  description: string;
  index: string;
}

export interface LogItem {
  text: string;
  options: Option[];
  type?: MessageTypes,
}
