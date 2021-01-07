import chunk from 'lodash.chunk';

import Host from '../hosts/basic';
import { Cursor } from './interfaces';

const CURSOR = {
  menu: 'menu',
  files: 'files',
  upgrades: 'upgrades',
};

export default class LocalhostCursorController {
  constructor(host: Host) {
    this.host = host;
  }

  host: Host;

  getCursor(cursor: string[] = [CURSOR.menu], page: number = 1): Cursor {
    console.log('cursor getOptions', cursor, page)
    switch (cursor[0].toLowerCase()) {
      case CURSOR.menu: {
        return {
          name: CURSOR.menu,
          items: ['Files', 'Upgrades'],
        };
      }
      case CURSOR.files: {
        const allFiles = this.host.fs.files;
        const filesByPage = chunk(allFiles, 9);
        // a specific file is requested
        if (cursor[1]) {
          const fileName = cursor[1].toLowerCase();
          const file = allFiles.find(({ name }) => name.toLowerCase() === fileName);
          // Show the file content and improve your skills if any available
          // TODO: write code to improve skills
          return {
            name: cursor[1],
            text: file!.content,
            items: [],
          };
        }
        const requestedFiles = filesByPage[page - 1];
        return {
          name: CURSOR.files,
          items: requestedFiles.map(f => f.name),
          page,
          totalPages: Math.ceil(allFiles.length / 9), // if this field exists, then next passed cursor will be the same
        };
      }
      default: {
        return {
          name: CURSOR.menu,
          items: ['Files', 'Upgrades'],
        };
      }
    }
  }
}
