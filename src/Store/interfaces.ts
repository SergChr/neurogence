import Localhost, { SkillNames } from 'Services/game/entities/hosts/localhost';
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

interface GameUpgrades extends Record<string, boolean> {}

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
  getLocalhostIndex(hosts: BasicHost[]): number;
  updateLocalhost: (payload: Partial<Localhost>) => Localhost;
  setLocalSkill(skill: SkillNames, value: number): void;
  getLocalhost(): Localhost;
  upgrades: GameUpgrades;
  setUpgrade(s: string, v: boolean): void;
}
