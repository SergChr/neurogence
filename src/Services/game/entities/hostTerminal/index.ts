import { gameStore } from '../../../../Store';
import Host from '../hosts/basic';
import Localhost from '../hosts/localhost';
import PC from '../hosts/pc';
import { HostTypes } from '../hosts/enums';
import PCCursorController from './PCCursorController';
import LocalhostCursorController from './LocalhostCursorController';
import MailServerCursorController from './MailServerCursorController';
import { Cursor } from './interfaces';
import MailServer from '../hosts/mailServer';

export default class HostTerminal {
  constructor(hostName: string) {
    const game = gameStore.getState();
    this.host = game.hosts.find(h => h.name === hostName)!;

    switch (this.host?.type) {
      case HostTypes.Localhost: {
        this.controller = new LocalhostCursorController(<Localhost>this.host);
        break
      }
      case HostTypes.PC: {
        this.controller = new PCCursorController(<PC>this.host);
        break;
      }
      case HostTypes.MailServer: {
        this.controller = new MailServerCursorController(<MailServer>this.host);
        break;
      }
    }
  }

  host: Host;
  controller?: LocalhostCursorController
    | PCCursorController
    | MailServerCursorController;

  getCursor(cursorNames?: string[], page?: number): Cursor {
    const newCursor = this.controller!.getCursor(cursorNames, page);
    return newCursor;
  }
}
