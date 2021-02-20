import Localhost, { SkillNames } from 'Services/game/entities/hosts/localhost';
import BasicHost from '../Services/game/entities/hosts/basic';
import { BotData } from '../Services/game/entities/bot';
import { JobTypes } from '../Services/job/jobs/types';
import { Upgrades } from '../Services/game/entities/hosts/enums';
import { GameVars } from 'Config/enums';

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

interface GameUpgrades extends Set<Upgrades> {};
interface Store extends Record<string, any> {};

export interface LogStore extends Store {
  log: LogEntry[];
  write: (text: string, type?: LogEntryTypes) => void;
  reset: () => void;
  botLog: Map<string, string[]>;
  addBotLog(id: string, msg: string): void;
}

export interface GameStore extends Store {
  progress: { value: number, handled: boolean };
  setProgress: (n: number, handled?: boolean) => void;
  hosts: BasicHost[];
  addHost: (h: BasicHost) => void;
  getLocalhostIndex(hosts: BasicHost[]): number;
  updateLocalhost: (payload: Partial<Localhost>) => Localhost;
  destroyHalfLocalhost(): void;
  setLocalSkill(skill: SkillNames, value: number): void;
  getLocalhost(): Localhost;

  updateHost(name: string, payload: Partial<BasicHost>): void;

  upgrades: GameUpgrades;
  setUpgrade(s: Upgrades): void;

  bots: BotData[];
  updateBot(payload: BotData, toRemove?: boolean): void;

  blockedBots: Map<string, {blockedAttempts: number}>;
  blockBot(id: string): void;

  jobs: Set<JobTypes>;

  variables: Map<string, any>;
  setVar(key: GameVars, value: any): void;
  getVar(key: GameVars): any;
}
