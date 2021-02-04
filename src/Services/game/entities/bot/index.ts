import Chance from 'chance';

import { OS } from '../hosts/enums';
import Host from '../hosts/basic';
import { Script, ScriptItem, ScriptTypes } from './interface';
import { bruteforcePassword } from './execScripts';
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

export type ScriptExecutionResult = {
  isOk: boolean;
  updHost: Host;
  updLocalhost: Localhost;
};

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

  // TODO: maybe write and show bot logs? We might call it "debug"
  // to give user a scheme what is happening under the hood
  async executeScriptsOn(host: Host, localhost: Localhost): Promise<any> {
    const s = this.scripts;
    const intermediary = [];

    for await (const script of s) {
      if (Array.isArray(script)) {
        for await (const scriptItem of script) {
          const { isOk, updHost, updLocalhost } = await this.executeScript(scriptItem, host, localhost);
          if (!isOk) {
            intermediary.push(false);
            continue;
          }
          host = updHost;
          localhost = updLocalhost;
          intermediary.push(true);
        }
      } else {
        const lastScriptResult = intermediary[intermediary.length - 1];
        if (lastScriptResult === false) {
          break;
        }
        const { isOk, updHost, updLocalhost } = await this.executeScript(script, host, localhost);
        if (isOk) {
          intermediary.push(true);
          host = updHost;
          localhost = updLocalhost;
        } else {
          break;
        }
      }
    }

    return;
  }

  async executeScript(s: ScriptItem, host: Host, localhost: Localhost): Promise<ScriptExecutionResult> {
    const response = (
      isOk: boolean = false,
      updHost: Host = host,
      updLocalhost: Localhost = localhost,
    ) => ({
      isOk, updHost, updLocalhost,
    });

    switch (s.type) {
      case ScriptTypes.SearchForHosts: return response(true);
      case ScriptTypes.BruteforcePassword: return bruteforcePassword(host, localhost);

      default: return response();
    }
  }
}
