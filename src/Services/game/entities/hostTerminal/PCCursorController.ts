import chunk from 'lodash.chunk';

import { SkillNames } from '../hosts/localhost';
import PC from '../hosts/pc';
import { Cursor } from './interfaces';

const CURSOR = {
  menu: 'menu',
  files: 'files',
};

export default class PCCursorController {
  constructor(host: PC) {
    this.host = host;
  }

  host: PC;

  getCursor(cursor: string[] = [CURSOR.menu], page: number = 1): Cursor {
    switch (cursor[0].toLowerCase()) {
      case CURSOR.menu: {
        return {
          name: CURSOR.menu,
          items: ['Files'],
        };
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
            this.host.setSkill(key as SkillNames, value);
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
          items: ['Files'],
        };
      }
    }
  }
}
