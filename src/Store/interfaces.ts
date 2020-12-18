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

export interface LogStore extends Record<string, any> {
  log: LogEntry[];
  writeLog: (text: string, type?: LogEntryTypes) => void;
}
