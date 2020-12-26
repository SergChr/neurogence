import Host from '../hosts/basic';

export default class LocalhostCursorController {
  constructor(host: Host) {
    this.host = host;
  }

  host: Host;

  // TODO
  getOptions(cursor: string[]): [string, string[]] {
    const c = cursor;
    if (c.length === 0) {
      // 1) View files
      // 2) Upgrades
      return ['Main menu', ['View files', 'Upgrades']];
    }

    if (c[0] == '1') {
      // Show files

      // if c[1] exists then show a specific file
      if (c[1]) {
        // because c[1] is an index
        // readFile(c[1])
        // 1. Perform side effect provided(if any) by a file: like improving a skill
        // 2. Return new options
      } 
    } else if (c[0] == '2') {
      // Show upgrades
    }
    return ['', []];
  }
}
