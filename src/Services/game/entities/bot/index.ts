import Chance from 'chance';

import { OS } from '../hosts/enums';
import { Script, ScriptItem } from './interface';

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

  executeScript(s: ScriptItem) {

  }
}
