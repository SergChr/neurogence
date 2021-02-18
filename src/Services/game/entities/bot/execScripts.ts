import sleep from "../../../../utils/sleep";
import Host, { PortStates } from "../hosts/basic";
import Localhost from "../hosts/localhost";
import logStore from '../../../../Store/log';
import gameStore from '../../../../Store/game';
import {
  ScriptExecutionResult,
  ScriptExecProps,
  ScriptItem,
  ScriptTypes,
} from './interface';
import { GameVars } from "../../../../Config/enums";

const writeBotLog = (id: string, text: string) => logStore.getState().addBotLog(id, text);
const blockBot = (id: string) => gameStore.getState().blockBot(id);

const response = (
  isOk: boolean,
  updHost?: Host,
  updLocalhost?: Localhost,
): ScriptExecutionResult => ({
  isOk,
  updHost: updHost || undefined,
  updLocalhost: updLocalhost || undefined,
});

type Args = ScriptExecProps & { bot: any };

const isConnected = (h: Host) => h.connected === true;
const isAntiBotSystemEnabled = (h: Host) => {
  const n = 0.19;//Math.random();
  if (n > 0.2 && n < 0.6) {
    return false;
  }

  let arePortsOpen = false;
  for (const [port] of h.ports) {
    if (h.ports.get(port) == PortStates.Opened) {
      arePortsOpen = true;
      break;
    }
  }

  if (arePortsOpen || !h.isUserLogEmpty) {
    return true;
  }

  return false;
};

export const executeScript = async ({
  s,
  host,
  localhost,
  vars,
  bot,
}: ScriptExecProps & { s: ScriptItem, bot: any }): Promise<ScriptExecutionResult> => {
  const response = (
    isOk: boolean = false,
    updHost: Host = host,
    updLocalhost: Localhost = localhost,
  ) => ({
    isOk, updHost, updLocalhost,
  });

  const params = { host, localhost, vars, bot };

  switch (s.type) {
    case ScriptTypes.SearchForHosts: return response(true);
    case ScriptTypes.BruteforcePassword: return bruteforcePassword(params);
    case ScriptTypes.LoginViaExploit: return loginViaExploit(params);
    case ScriptTypes.ForceAbsorb: return forceAbsorb(params);
    case ScriptTypes.ClosePorts: return closePorts(params);
    case ScriptTypes.DeleteUserLog: return deleteUserLog(params);
    case ScriptTypes.Absorb: return absorb(params);

    default: return response();
  }
}

export const bruteforcePassword = async ({
  host,
  localhost,
  vars,
  bot,
}: Args) => {
  if (isAntiBotSystemEnabled(host)) {
    blockBot(bot.id);
    writeBotLog(bot.id, `!!! The bot was detected. This host has sent the bot signature to other hosts.
Perhaps you should terminate the bot to eliminate future problems.`);
    return response(false);
  }

  if (host.connected === true) {
    writeBotLog(bot.id, 'Skip bruteforcing passwords: the bot is already logged in');
    return response(true);
  }
  writeBotLog(bot.id, 'Bruteforce passwords started');
  const pwdLen = host.password.length;
  const timeToBruteforce = pwdLen / (localhost.TFLOPS / 2); // seconds
  console.log('> bruteforcePassword: pwd len', pwdLen);
  console.log('> bruteforcePassword: time', timeToBruteforce);
  if (timeToBruteforce > vars.get(GameVars.BruteforcePwdLimitTime)) {
    writeBotLog(bot.id, `Bruteforcing a password takes longer than ${vars.get(GameVars.BruteforcePwdLimitTime)} seconds, aborting`);
    return response(false);
  }
  await sleep(timeToBruteforce * 1000);
  host.connected = true;
  writeBotLog(bot.id, 'Bruteforce passwords success: a password matched');
  return response(true, host);
}

export const loginViaExploit = (p: Args) => {
  // TODO: uncomment
  if (1/*p.host.securityPatch < p.localhost.exploitVersion*/) {
    writeBotLog(p.bot.id, 'Logged in via exploit');
    p.host.connected = true;
    return response(true, p.host);
  }

  writeBotLog(p.bot.id, 'Login via applying an exploit failed');
  return response(false);
}

export const forceAbsorb = (p: Args) => {
  if (p.host.canBeEnslavedViaComputingTranscendence(p.localhost.FLOPS)) {
    writeBotLog(p.bot.id, 'Absorbed host forcefully');
    p.host.connected = true;
    p.host.enslave();
    return response(true, p.host);
  }

  writeBotLog(p.bot.id, 'Force absorb failed');
  return response(true);
}

export const closePorts = (p: Args) => {
  if (!isConnected(p.host)) {
    writeBotLog(p.bot.id, 'Failed to close ports: the bot isn\'t logged in to the host');
    return response(false);
  }
  for (const [port] of p.host.ports) {
    p.host.ports.set(port, PortStates.Closed);
  }

  writeBotLog(p.bot.id, 'All network ports were closed');
  return response(true, p.host);
}

export const deleteUserLog = (p: Args) => {
  if (!isConnected(p.host)) {
    writeBotLog(p.bot.id, 'Failed to delete user log: the bot isn\'t logged in to the host');
    return response(false);
  }
  p.host.isUserLogEmpty = true;
  writeBotLog(p.bot.id, 'A user log has been deleted');
  return response(true, p.host);
}

export const absorb = (p: Args) => {
  if (!isConnected(p.host)) {
    writeBotLog(p.bot.id, 'Failed to absorb: the bot isn\'t logged in to the host');
    return response(false);
  }
  p.host.enslave();
  writeBotLog(p.bot.id, 'The host has been absorbed');
  return response(true, p.host);
}
