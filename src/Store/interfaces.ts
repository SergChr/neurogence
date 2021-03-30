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

interface Store extends Record<string, any> {};
type UpdateLocalhost = Partial<Localhost> & { override?: Record<string, any> }; 

export interface LogStore extends Store {
  log: LogEntry[];
  write: (text: string, type?: LogEntryTypes) => void;
  reset: () => void;
  botLog: Record<string, string[]>;
  addBotLog(id: string, msg: string): void;
}

export interface GameStore extends Store {
  progress: { value: number, handled: boolean };
  setProgress: (n: number, handled?: boolean) => void;
  hosts: BasicHost[];
  addHost: (h: BasicHost) => void;
  getLocalhostIndex(hosts: BasicHost[]): number;
  updateLocalhost: (payload: UpdateLocalhost) => Localhost;
  destroyHalfLocalhost(): void;
  setLocalSkill(skill: SkillNames, value: number): void;
  getLocalhost(): Localhost;

  updateHost(name: string, payload: Partial<BasicHost> & { override?: Record<string, any> }): void;

  upgrades: Partial<Record<Upgrades, boolean>>;
  setUpgrade(s: Upgrades): void;

  bots: BotData[];
  updateBot(payload: BotData, toRemove?: boolean): void;

  blockedBots: Record<string, {blockedAttempts: number}>;
  blockBot(id: string): void;

  jobs: JobTypes[];

  variables: Record<GameVars, any>;
  setVar(key: GameVars, value: any): void;
  getVar(key: GameVars): any;
}
