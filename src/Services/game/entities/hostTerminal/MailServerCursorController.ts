import chunk from 'lodash.chunk';

import { gameStore } from '../../../../Store';
import MailServer, { Email } from '../hosts/mailServer';
import { Cursor, CursorItem, MessageTypes } from './interfaces';

const CURSOR = {
  menu: 'Menu',
  notConnectedMenu: 'Menu',
  connect: 'Connect via SSH',
  password: 'Password?',
  enslaveViaSecurity: 'Enslave via exploit',
  users: 'Users',
};

const menuItems = [CURSOR.users];
const formatEmail = (e: Email) => {
  e?.onRead && e.onRead();
  return `==============================
  to: ${e.to}
  
  ${e.content}
  ${e.comment ? `------------------------
  ${e.comment}` : ''}`;
}

export default class MailServerCursorController {
  constructor(host: MailServer) {
    this.host = host;
  }

  host: MailServer;

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
            if (MailServer.canBeEnslavedViaSecurityProblem(this.host, localhost.exploitVersion)) {
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
              items: menuItems,
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
      case CURSOR.users: {
        const { users } = this.host;
        
        // a specific user choosen
        if (cursor[1]) {
          const userName = cursor[1];
          const user = users.find((u) => u.fullName === userName);
          return {
            name: cursor[1],
            text: user?.emails.map(formatEmail).join('\n'),
            items: [],
          };
        }

        const usersByPage = chunk(users, 9);
        const requestedUsers = usersByPage[page - 1];
        return {
          name: CURSOR.users,
          items: requestedUsers.map(u => u.fullName),
          page,
          totalPages: Math.ceil(users.length / 9),
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
