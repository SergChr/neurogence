import BasicHost, { CPU } from './basic';
import { HostTypes } from './enums';

interface ConstructorArgs {
  name: string;
  securityPatch: number;
  cpu: CPU;
  users?: User[];
  password: string;
  passwordSuggestions: string[];
}

interface User {
  fullName: string;
  emails: Email[];
}

export interface Email {
  to: string;
  content: string;
  onRead?: Function;
  comment?: string;
}

export default class MailServer extends BasicHost {
  constructor(p: ConstructorArgs) {
    super({
      name: p.name,
      type: HostTypes.MailServer,
      cpu: p.cpu,
      passwordSuggestions: p.passwordSuggestions,
      password: p.password,
    });
    this.securityPatch = p.securityPatch;
    this.users = p.users || [];
  }

  users: User[];
}
