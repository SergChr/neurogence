import BasicHost, { CPU } from './basic';
import { HostTypes } from './enums';
import { Skills } from './localhost';

interface ConstructorArgs {
  name: string;
  securityPatch: number;
  cpu: CPU;
  mails?: Mail[];
}

interface Mail {
  from: string;
  to: string;
  content: string;
  values: Skills;
  onRead?: Function;
}

export default class MailServer extends BasicHost {
  constructor(p: ConstructorArgs) {
    super({
      name: p.name,
      type: HostTypes.MailServer,
      cpu: p.cpu,
    });
    this.securityPatch = p.securityPatch;
    this.mails = p.mails || [];
  }

  mails: Mail[];
  public addMail(m: Mail) {
    this.mails.push(m);
  }
}
