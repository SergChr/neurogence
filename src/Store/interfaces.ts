import Localhost, { SkillNames } from 'Services/game/entities/hosts/localhost';
import BasicHost from '../Services/game/entities/hosts/basic';
import Bot, { BotData } from '../Services/game/entities/bot';
import { JobTypes } from '../Services/job/jobs/types';

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

// TODO: replace with Set
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
  updateHost(name: string, payload: Partial<BasicHost>): void;
  upgrades: GameUpgrades;
  setUpgrade(s: string, v: boolean): void;
  bots: Bot[];
  updateBot(payload: BotData, toRemove?: boolean): void;
  jobs: Set<JobTypes>;
}
