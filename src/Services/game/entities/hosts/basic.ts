import constants from '../../../../Config/constants';
import { File } from '../file';
import { HostTypes } from './enums';

export interface CPU {
  cores: number;
  frequency: number;
  ops: number; // operations per second
}

enum PortStates {
  Opened = 1,
  Closed = 0,
}

interface Port {
  n: number; // port number
  state: PortStates;
}

type Constructor = {
  name: string;
  type: HostTypes;
  cpu: CPU;
  files?: File[];
}

interface Filesystem {
  files: File[];
}

export default class Host {
  constructor(p: Constructor) {
    this.name = p.name;
    this.type = p.type;
    this.cpu = p.cpu;
    if (p.files) {
      this.fs.files = p.files;
    }
    this.password = ' ';
  }

  public readonly name: string;
  public readonly type: HostTypes;
  public readonly cpu: CPU;
  public ports: Port[] = [];
  public readonly fs: Filesystem = {
    files: [],
  };
  enslavedViaVulnerability = false;
  enslavedViaTranscendence = false;
  connected = false;
  password: string;

  // 0 indicates there is no security patches, the host should be updated.
  // If not updated, it can be enslaved without any effort.
  // The greater the number, the harder to enslave the host.
  public securityPatch: number = 0;

  public get FLOPS() {
    return this.cpu.cores * this.cpu.frequency * this.cpu.ops;
  }

  public addFile(file: File) {
    this.fs.files.push(file);
  }

  public canBeEnslavedViaSecurityProblem(exploitVersion: number) {
    return exploitVersion > this.securityPatch;
  }

  public canBeEnslavedViaComputingTranscendence(flops: number) {
    return flops > (constants.COMP_TRANSCENDENCE_COEF * this.FLOPS);
  }

  setPassword(p: string) {
    this.password = p;
  }
}
