import BasicHost, { CPU } from './basic';
import { File } from '../file';
import { HostTypes } from './enums';

interface ConstructorArgs {
  name: string;
  securityPatch: number;
  cpu: CPU;
  files?: File[];
  owner?: string;
  passwordSuggestions?: string[];
  password?: string;
  isDiaglyph?: boolean;
}

const UNKNOWN = 'unknown';

// TODO: name something "sempiternal"

// TODO: write functionality to talk with the owner of the PC
// Like:
// - Ask Phillip to open the file you sent him
// - Ask Martha to ...
//
// Also, to be able to STEAL the identity to talk like him
// Then some people can trust you and do whatever(almost) you want

// Personal computer
export default class PC extends BasicHost {
  constructor(p: ConstructorArgs) {
    super({
      name: p.name,
      type: HostTypes.PC,
      cpu: p.cpu,
      passwordSuggestions: p.passwordSuggestions,
      password: p.password,
    });
    this.securityPatch = p.securityPatch;
    this.fs.files = p.files || [];
    this.owner = p.owner || UNKNOWN;
    this.isDiaglyph = p.isDiaglyph || false;
  }

  owner: string;
  isDiaglyph: boolean;
}
