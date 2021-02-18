import Chance from 'chance';

import { OS } from '../hosts/enums';
import Host from '../hosts/basic';
import {
  Script,
  ScriptItem,
  ScriptTypes,
  ScriptExecutionResult,
  ScriptExecProps,
  ScriptsExecResult,
} from './interface';
import {
  bruteforcePassword,
  loginViaExploit,
  forceAbsorb,
  closePorts,
  deleteUserLog,
  absorb,
} from './execScripts';
import Localhost from '../hosts/localhost';

type BotCreationProps = {
  name?: string;
  scripts?: Script[];
  targetOS?: OS;
  id?: string;
};

export type BotData = {
  id: string;
  name: string;
  scripts: Script[];
  targetOS: OS;
  metrics: {
    quantity: number;
    absorbedHosts: number;
  };
}

const chance = new Chance();

export default class Bot {
  constructor(p: BotCreationProps = {}) {
    this.id = p.id || chance.guid();
    let name = chance.word();
    name = `${name[0].toUpperCase()}${name.slice(1, name.length - 1)}`;
    this.name = p.name || name;
    this.scripts = p.scripts || [];
    this.targetOS = p.targetOS || OS.CentOS;
    this.metrics = {
      quantity: 0,
      absorbedHosts: 0,
    };
  }

  id: string;
  name: string;
  scripts: Script[];
  targetOS: OS;
  metrics: {
    quantity: number;
    absorbedHosts: number;
  };

  static createScript(p: Partial<ScriptItem>) {
    return {
      type: p.type!,
      thenText: p.thenText || 'Once done, then',
      shouldBeLast: p.shouldBeLast || false,
      description: p.description!,
      hasOrSupport: p.hasOrSupport || false,
      group: p.group,
    };
  }

  async executeScriptsOn({
    host,
    localhost,
    vars,
  }: ScriptExecProps): Promise<ScriptsExecResult> {
    const s = this.scripts;
    const intermediary = [];

    for await (const script of s) {
      if (Array.isArray(script)) {
        for await (const scriptItem of script) {
          const { isOk, updHost, updLocalhost } = await this.executeScript({
            s: scriptItem,
            host,
            localhost,
            vars,
          });
          if (!isOk) {
            intermediary.push(false);
            continue;
          }
          if (updHost) {
            if (updHost.enslaved) {
              this.metrics.absorbedHosts += 1;
            }
            host = updHost;
          }
          if (updLocalhost) {
            localhost = updLocalhost;
          }
          intermediary.push(true);
          break;
        }
      } else {
        const lastScriptResult = intermediary[intermediary.length - 1];
        if (lastScriptResult === false) {
          break;
        }
        const { isOk, updHost, updLocalhost } = await this.executeScript({
            s: script,
            host,
            localhost,
            vars,
        });
        if (isOk) {
          intermediary.push(true);
          if (updHost) {
            if (updHost.enslaved) {
              this.metrics.absorbedHosts += 1;
            }
            host = updHost;
          }
          if (updLocalhost) {
            localhost = updLocalhost;
          }
        } else {
          break;
        }
      }
    }

    const isOk = intermediary[intermediary.length - 1];
    return {
      isOk,
      localhost,
      bot: this,
    };
  }

  async executeScript({
    s,
    host,
    localhost,
    vars,
}: ScriptExecProps & { s: ScriptItem }): Promise<ScriptExecutionResult> {
    const response = (
      isOk: boolean = false,
      updHost: Host = host,
      updLocalhost: Localhost = localhost,
    ) => ({
      isOk, updHost, updLocalhost,
    });

    const params = { host, localhost, vars, bot: this };

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
}
