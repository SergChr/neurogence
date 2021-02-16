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
      type: HostTypes.Camera,
      cpu: p.cpu,
    });
    this.securityPatch = p.securityPatch;
    this.fs.files = p.files || [];
  }

  // Helps to improve image*video procesing skill
  // TODO: implement
  public collectVideoStreamData() {
    // Evaluates how much computing time & power you spent
    // to give you an addition to img & video procesing skill
  }
}
