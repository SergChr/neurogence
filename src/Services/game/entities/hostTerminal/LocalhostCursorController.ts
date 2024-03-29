import chunk from 'lodash.chunk';

import Localhost, { SkillNames } from '../hosts/localhost';
import { gameStore } from '../../../../Store';
import { Cursor } from './interfaces';
import actionsMap from '../../actions/actionsMap';
import upgradesMap from '../../actions/upgradeActionsMap';

const CURSOR = {
  menu: 'Menu',
  files: 'Files',
  upgrades: 'Upgrades',
};

export default class LocalhostCursorController {
  constructor(host: Localhost) {
    this.host = host;
  }

  host: Localhost;

  getCursor(cursor: string[] = [CURSOR.menu], page: number = 1): Cursor {
    switch (cursor[0]) {
      case CURSOR.menu: {
        return {
          name: CURSOR.menu,
          items: [CURSOR.files, CURSOR.upgrades],
        };
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
            text: file.content,
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
      case CURSOR.upgrades: {
        const upgrades = this.host.upgrades;
        if (upgrades.length < 1) {
          return {
            name: CURSOR.upgrades,
            items: [],
          }
        }
        const byPage = chunk(upgrades, 9);

        // a specific upgrade requested
        if (cursor[1]) {
          const upgradeName = cursor[1].toLowerCase();
          const i = this.host.upgrades.findIndex(({ id }) => id.toLowerCase() === upgradeName);
          const target = upgrades[i];
          const payloadForAction = target.payload;
          const result = upgradesMap[target.id]?.(payloadForAction);
          // Delete the upgrade
          this.host.upgrades.splice(i, 1);
          gameStore.getState().updateLocalhost({ override: { upgrades: this.host.upgrades } });
          return {
            name: cursor[1],
            text: result || 'Upgrade is done.',
            items: [],
          };
        }

        const requestedUpgrades = byPage[page - 1].map(u => ({
          value: u.id,
          description: u.description,
        }));
        return {
          name: CURSOR.upgrades,
          items: requestedUpgrades,
          page,
          totalPages: Math.ceil(upgrades.length / 9),
        }
      }
      default: {
        return {
          name: CURSOR.menu,
          items: [CURSOR.files, CURSOR.upgrades],
        };
      }
    }
  }
}
