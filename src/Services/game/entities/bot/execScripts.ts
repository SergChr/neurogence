import sleep from "../../../../utils/sleep";
import Host, { PortStates } from "../hosts/basic";
import Localhost from "../hosts/localhost";
import Bot from './index';
import logStore from '../../../../Store/log';
import {
  ScriptExecutionResult,
  ScriptExecProps,
} from './interface';

const writeBotLog = (id: string, text: string) => logStore.getState().addBotLog(id, text);

const response = (
  isOk: boolean,
  updHost?: Host,
  updLocalhost?: Localhost,
): ScriptExecutionResult => ({
  isOk,
  updHost: updHost || undefined,
  updLocalhost: updLocalhost || undefined,
});

type Args = ScriptExecProps & { bot: Bot };

const isConnected = (h: Host) => h.connected === true;

export const bruteforcePassword = async ({
  host,
  localhost,
  vars,
  bot,
}: Args) => {
  writeBotLog(bot.id, 'Bruteforce passwords started');
  const pwdLen = host.password.length;
  const timeToBruteforce = pwdLen / (localhost.TFLOPS / 2); // seconds
  console.log('> bruteforcePassword: pwd len', pwdLen);
  console.log('> bruteforcePassword: time', timeToBruteforce);
  if (timeToBruteforce > vars.get('bruteforcePwdTimeLimit')) {
    writeBotLog(bot.id, `Bruteforcing a password takes longer than ${vars.get('bruteforcePwdTimeLimit')} seconds, aborting`);
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
  for (const [port] of p.host.ports) {
    p.host.ports.set(port, PortStates.Closed);
  }

  writeBotLog(p.bot.id, 'All network ports were closed');
  return response(true, p.host);
}
