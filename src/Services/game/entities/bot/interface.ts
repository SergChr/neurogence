export enum ScriptTypes {
  SearchForHosts = 'Search for target hosts',
  BruteforcePassword = 'Log in via bruteforcing password',
  LoginViaExploit = 'Log in via exploit',
  ForceAbsorb = 'Force absorb',
  DDoSAttack = 'DDoS attack on host', // dangerous

  ///// Logged in /////

  // Abrupt any network connections, so a host can't send a help signal or a bot signature
  // that'll help other hosts to discover this specific bot and become immune to it
  ClosePorts = 'Close all the ports',
  DeleteUserLog = 'Delete user log',
  Absorb = 'Absorb host',
  CloneItself = 'Clone itself', // automation! you don't need to click "Release"
}

export enum ScriptGroups {
  Login = 'login',
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
