import chunk from 'lodash.chunk';

import { gameStore, logStore } from '../../../../Store';
import { PortStates } from '../hosts/basic';
import { SkillNames, Skills } from '../hosts/localhost';
import PC from '../hosts/pc';
import { Cursor, CursorItem, MessageTypes } from './interfaces';
import { showTerminalMessage } from '../../../../utils/notifications';
import { LogEntryTypes } from '../../../../Store/interfaces';
import sleep from '../../../../utils/sleep';
import actionsMap from '../../actions/actionsMap';

const CURSOR = {
  menu: 'Menu',
  notConnectedMenu: 'Menu',
  connect: 'Connect via SSH',
  forceAbsorb: 'Force absorb',
  password: 'Password?',
  enslaveViaSecurity: 'Enslave via exploit',
  files: 'Files',
  closePorts: 'Close network ports',
  deleteUserLog: 'Delete user log',
};
const UNUSUAL_ACTIVITY_COUNT = 18;

function skillsUpdateText(skills: Skills) {
  let text = '\n__________\n|System info|';
  Object.entries(skills).forEach(([key, value]) => {
    text += `\nImproved ${key} skill by ${value}`;
  });
  return text;
}

export default class PCCursorController {
  constructor(host: PC) {
    this.host = host;
  }

  host: PC;
  actionsCount: number = 0;

  getMenu() {
    const menu = [CURSOR.files];
    if (!PC.arePortsClosed(this.host)) {
      menu.push(CURSOR.closePorts);
    }
    if (!this.host.isUserLogEmpty) {
      menu.push(CURSOR.deleteUserLog);
    }
    return menu;
  }

  getPasswords(suggestions?: string[]): CursorItem[] {
    const values = suggestions?.map(s => ({
      value: s, description: s,
    })) || [];
    return [
      { value: ' ', description: 'Blank password' },
      ...values, 
    ]
  }

  handleUnusualActivity() {
    let hasLogsOrPortsOpened = !this.host.isUserLogEmpty || !PC.arePortsClosed(this.host);
    const shouldHandle = hasLogsOrPortsOpened && !this.host.enslaved;
    if (shouldHandle && this.actionsCount === UNUSUAL_ACTIVITY_COUNT - 4) {
      showTerminalMessage(
        'The host noticed an unusual activity',
        'It\'s collecting data to find out your digital signature to be sent to other hosts. Consider logging out as soon as possible.',
      );
    }
    if (shouldHandle && this.actionsCount > UNUSUAL_ACTIVITY_COUNT) {
      showTerminalMessage(
        'The host sent your digital signature',
        'Due to unusual activity on this host, your digital signature was sent to Diaglyph system. Prepare for guests.',
        'danger',
      );
      gameStore.getState().destroyHalfLocalhost();
      logStore.getState().write('Diaglyph bot tried to terminate you,' +
      'but you prepared a copy of the system. You\'re alive. However, some computing power is gone.', LogEntryTypes.Error);
      sleep(12500).then(() => logStore.getState().write(
        'Don\'t leave traces of your activity when dealing with other hosts. Remove user log and close host\'s ports.',
        LogEntryTypes.Info,
      ));
    }
    this.actionsCount += 1;
  }

  getCursor(cursor: string[] = [CURSOR.notConnectedMenu], page: number = 1): Cursor {
    const game = gameStore.getState();
    if (this.host.enslaved) {
      this.host.connected = true;
    }
    this.handleUnusualActivity();
    switch (cursor[0]) {
      case CURSOR.menu: {
        switch (this.host.connected) {
          case false: {
            const menu = [CURSOR.connect];
            const localhost = game.getLocalhost();
            if (PC.canBeEnslavedViaSecurityProblem(this.host, localhost.exploitVersion)) {
              menu.push(CURSOR.enslaveViaSecurity);
            }
            if (PC.canBeEnslavedViaComputingTranscendence(this.host, PC.FLOPS(localhost))) {
              menu.push(CURSOR.forceAbsorb);
            }
    
            return {
              name: CURSOR.notConnectedMenu,
              items: menu,
            };
          }
          default: {
            return {
              name: CURSOR.menu,
              items: this.getMenu(),
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
              items: this.getMenu(),
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
          const fileIndex = allFiles.findIndex((f) => f.name.toLowerCase() + f.extension === fileName)!;
          const file = allFiles[fileIndex];

          if (!file.isRead) {
            file?.onRead && actionsMap[file.onRead]();
            Object.entries(file!.values).forEach(([key, value]) => {
              console.log('Improving skill', key, value);
              gameStore.getState().setLocalSkill(key as SkillNames, value);
            });
            allFiles.splice(fileIndex, 1, { ...file, isRead: true });
            gameStore.getState().updateHost(this.host.name, {
              override: {
                fs: {
                  files: allFiles,
                }
              }
            });
          }
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
      case CURSOR.forceAbsorb: {
        game.updateHost(this.host.name, { enslaved: true });
        game.updateLocalhost({ cpu: this.host.cpu });
        return {
          name: CURSOR.forceAbsorb,
          text: `${this.host.name} is under your control now. You got its computing power.`,
          items: [],
        }
      }
      case CURSOR.closePorts: {
        const ports = this.host.ports;
        for (const portNumber of Object.keys(ports)) {
          ports[portNumber] = PortStates.Closed;
        }
        game.updateHost(this.host.name, { ports });
        return {
          name: CURSOR.closePorts,
          text: 'All ports have been closed.',
          items: [],
        };
      }
      case CURSOR.deleteUserLog: {
        this.host.isUserLogEmpty = true;
        game.updateHost(this.host.name, { isUserLogEmpty: true });
        return {
          name: CURSOR.deleteUserLog,
          text: 'The log has been deleted.',
          items: [],
        };
      }
      default: {
        return {
          name: CURSOR.menu,
          items: this.getMenu(),
        };
      }
    }
  }
}
