import { File } from '../file';
import BasicHost, { CPU } from './basic';
import { HostTypes } from './enums';

interface ConstructorArgs {
  name: string;
  securityPatch: number;
  cpu: CPU;
  files?: File[];
}

export default class Router extends BasicHost {
  constructor(p: ConstructorArgs) {
    super({
      name: p.name,
      type: HostTypes.Router,
      cpu: p.cpu,
    });
    this.securityPatch = p.securityPatch;
    this.fs.files = p.files || [];
  }
}
