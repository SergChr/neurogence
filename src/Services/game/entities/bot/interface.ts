import Host from '../hosts/basic';
import Localhost from '../hosts/localhost';
import Bot from './index';

export enum ScriptTypes {
  SearchForHosts = 'Search for target hosts',
  BruteforcePassword = 'Log in via bruteforcing password',
  LoginViaExploit = 'Log in via exploit',
  ForceAbsorb = 'Force absorb',

  ///// Logged in /////

  // Abrupt any network connections, so a host can't send a help signal or a bot signature
  // that'll help other hosts to discover this specific bot and become immune to it
  ClosePorts = 'Close all the ports',
  DeleteUserLog = 'Delete user log',
  Absorb = 'Absorb host',
  // CloneItself = 'Clone itself', // automation! you don't need to click "Release"
  VerifyDiaglyphHost = 'Verify it\'s a Diaglyph host',
}

export enum ScriptGroups {
  OutsideHost = 'outsideHost',
  Login = 'login',
  LoggedIn = 'loggedIn',
}

export type ScriptItem = {
  type: ScriptTypes;
  thenText: string;
  shouldBeLast: boolean;
  description: string;
  hasOrSupport: boolean;
  group?: ScriptGroups;
};

export type Script = ScriptItem | ScriptItem[];

export type ScriptExecutionResult = {
  isOk: boolean;
  updHost?: Host;
  updLocalhost?: Localhost;
};

export type ScriptsExecResult = {
  isOk: boolean;
  localhost: Localhost;
  bot: Bot;
}

export type ScriptExecProps = {
  host: Host;
  localhost: Localhost;
  vars: Map<string, any>;
};
