import chunk from 'lodash.chunk';

import { gameStore } from '../../../../Store';
import { SkillNames } from '../hosts/localhost';
import PC from '../hosts/pc';
import { Cursor, CursorItem, MessageTypes } from './interfaces';

const CURSOR = {
  menu: 'Menu',
  notConnectedMenu: 'Menu',
  connect: 'Connect via SSH',
  password: 'Password?',
  enslaveViaSecurity: 'Enslave via security vulnerability',
  files: 'files',
};

const menuItems = [CURSOR.files];

export default class PCCursorController {
  constructor(host: PC) {
    this.host = host;
  }

  host: PC;

  getPasswords(): CursorItem[] {
    return [
      // TODO: not for the all hosts these options will be the same
      { value: ' ', description: 'Blank password' },
      { value: '123', description: '123' },
    ];
  }

  getCursor(cursor: string[] = [CURSOR.notConnectedMenu], page: number = 1): Cursor {
    const game = gameStore.getState();
    switch (cursor[0]) {
      case CURSOR.menu: {
        switch (this.host.connected) {
          case false: {
            const opts = [CURSOR.connect];
            const localhost = game.getLocalhost();
            if (this.host.canBeEnslavedViaSecurityProblem(localhost.exploitVersion)) {
              opts.push(CURSOR.enslaveViaSecurity);
            }
    
            return {
              name: CURSOR.notConnectedMenu,
              items: opts,
            };
          }
          default: {
            return {
              name: CURSOR.menu,
              items: menuItems,
            };
          }
        }
      }
      case CURSOR.connect: {
        if (cursor[1]) {
          const arePasswordsMatched = this.host.password === cursor[1];
          if (!arePasswordsMatched) {
            return {
              name: cursor[1],
              text: 'Failed: this password is invalid.',
              items: [],
              messageType: MessageTypes.Error,
            };
          } else {
            this.host.connected = true;
            return {
              name: CURSOR.menu,
              text: 'Menu (connected)',
              items: [CURSOR.files],
            };
          }
        }
        return {
          name: CURSOR.connect,
          text: 'Password?',
          items: this.getPasswords(),
          totalPages: Math.ceil(this.getPasswords().length / 9),
        }
      }
      case CURSOR.files: {
        const allFiles = this.host.fs.files;
        const filesByPage = chunk(allFiles, 9);

        // a specific file is requested
        if (cursor[1]) {
          const fileName = cursor[1].toLowerCase();
          const file = allFiles.find((f) => f.name.toLowerCase() + f.extension === fileName);
          file?.onRead && file.onRead();
          Object.entries(file!.values).forEach(([key, value]) => {
            gameStore.getState().setLocalSkill(key as SkillNames, value);
          });
          return {
            name: cursor[1],
            text: file!.content,
            items: [],
          };
        }
        const requestedFiles = filesByPage[page - 1];
        return {
          name: CURSOR.files,
          items: requestedFiles.map(f => f.name + f.extension),
          page,
          totalPages: Math.ceil(allFiles.length / 9), // if this field exists, then next passed cursor will be the same
        };
      }
      default: {
        return {
          name: CURSOR.menu,
          items: menuItems,
        };
      }
    }
  }
}
