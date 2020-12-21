import BasicHost, { CPU, File } from './basic';
import { HostTypes } from './enums';

interface ConstructorArgs {
  name: string;
  securityPatch: number;
  cpu: CPU;
  files?: File[];
}

export default class Camera extends BasicHost {
  constructor(p: ConstructorArgs) {
    super({
      name: p.name,
      type: HostTypes.MailServer,
      cpu: p.cpu,
    });
    this.securityPatch = p.securityPatch;
    this.fs.files = p.files || [];
  }

  // Helps to improve image*vide procesing skill
  // TODO: implement
  public collectVideoStreamData() {

  }

  // TODO: implement
  public finishStreamCollecting() {
    // Evaluates how much computing time & power you spent
    // to give you an addition to img & vide procesing skill
  }
}
