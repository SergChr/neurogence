import { gameStore } from '../../../../Store';
import Host from '../hosts/basic';
import { HostTypes } from '../hosts/enums';
import LocalhostCursorController from './LocalhostCursorController';

interface Option {
  value: string;
  description: string;
}

export enum MessageTypes {
  Regular,
  Verbose,
  Warn,
}

interface LogItem {
  text: string;
  options?: Option[];
  type?: MessageTypes,
}

function assembleOutput(text: string, opts: string[]): LogItem {
  return {
    text,
    options: opts.map((s: string, i: number) => ({
      value: i.toString(),
      description: s,
    })),
  };
}

export default class HostTerminal {
  constructor(hostName: string) {
    const game = gameStore.getState();
    this.host = game.hosts.find(h => h.name === hostName)!;
    
    switch (this.host.type) {
      case HostTypes.Localhost: {
        this.controller = new LocalhostCursorController(this.host);
      }
    }
  }

  host: Host;
  controller;

  getOptions(cursor: string[]): LogItem {
    const [text, options] = this.controller!.getOptions(cursor);
    return assembleOutput(text, options);
  }
}
