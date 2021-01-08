import BasicHost from '../Services/game/entities/hosts/basic';

export enum LogEntryTypes {
  Trace = 'trace',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
}

export interface LogEntry {
  createdAt: Date;
  text: string;
  type: LogEntryTypes;
}

interface Store extends Record<string, any> {}

export interface LogStore extends Store {
  log: LogEntry[];
  write: (text: string, type?: LogEntryTypes) => void;
  reset: () => void;
}

export interface GameStore extends Store {
  progress: number;
  setProgress: (n: number) => void;
  hosts: BasicHost[];
  addHost: (h: BasicHost) => void;
}
