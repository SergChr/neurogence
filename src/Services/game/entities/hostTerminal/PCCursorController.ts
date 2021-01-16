import chunk from 'lodash.chunk';

import { gameStore } from '../../../../Store';
import { SkillNames, Skills } from '../hosts/localhost';
import PC from '../hosts/pc';
import { Cursor, CursorItem, MessageTypes } from './interfaces';

const CURSOR = {
  menu: 'Menu',
  notConnectedMenu: 'Menu',
  connect: 'Connect via SSH',
  password: 'Password?',
  enslaveViaSecurity: 'Enslave via exploit',
  files: 'Files',
};

const menuItems = [CURSOR.files];

function skillsUpdateText(skills: Skills) {
  let text = '\n\n__________\n|System info|\n';
  Object.entries(skills).forEach(([key, value]) => {
    text += `Improved ${key} skill by ${value}`;
  });
  return text;
}

export default class PCCursorController {
  constructor(host: PC) {
    this.host = host;
  }

  host: PC;

  getPasswords(suggestions?: string[]): CursorItem[] {
    const values = suggestions?.map(s => ({
      value: s, description: s,
    })) || [];
    return [
      { value: ' ', description: 'Blank password' },
      ...values, 
    ]
  }

  getCursor(cursor: string[] = [CURSOR.notConnectedMenu], page: number = 1): Cursor {
    const game = gameStore.getState();
    if (this.host.enslaved) {
      this.host.connected = true;
    }
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
        const passwords = this.getPasswords(this.host.passwordSuggestions);
        const byPage = chunk(passwords, 9);
        const toBeShown = byPage[page - 1];
        return {
          name: CURSOR.connect,
          text: 'Password?',
          page,
          items: toBeShown,
          totalPages: Math.ceil(passwords.length / 9),
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
            text: file!.content + skillsUpdateText(file!.values),
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
      case CURSOR.enslaveViaSecurity: {
        game.updateHost(this.host.name, { enslaved: true });
        game.updateLocalhost({ cpu: this.host.cpu });
        return {
          name: CURSOR.enslaveViaSecurity,
          text: `${this.host.name} is under your control now. You got its computing power.`,
          items: [],
        }
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
