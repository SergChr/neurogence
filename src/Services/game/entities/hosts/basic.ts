import constants from '../../../../Config/constants';
import { File } from '../file';
import { HostTypes, OS } from './enums';

export interface CPU {
  cores: number;
  frequency: number;
  ops: number; // operations per cycle
}

export enum PortStates {
  Opened = 1,
  Closed = 0,
}

type Constructor = {
  name: string;
  type: HostTypes;
  cpu: CPU;
  files?: File[];
  passwordSuggestions?: string[];
  password?: string;
  OS?: OS;
  ports?: Record<string, PortStates>;
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
    this.password = p.password || ' ';
    this.passwordSuggestions = p.passwordSuggestions || [];
    this.OS = p.OS || OS.CentOS;
    this.ports = p.ports || {};
    this.isUserLogEmpty = false;
  }

  public readonly name: string;
  public readonly type: HostTypes;
  public cpu: CPU;
  public ports: Record<string, PortStates>;
  public readonly fs: Filesystem = {
    files: [],
  };
  enslaved = false;
  connected = false;
  password: string;
  passwordSuggestions: string[] = [];
  OS: OS;
  isUserLogEmpty: boolean;

  // 0 indicates there is no security patches, the host should be updated.
  // If not updated, it can be enslaved without any effort.
  // The greater the number, the harder to enslave the host.
  public securityPatch: number = 0;

  static FLOPS(h: Host) {
    return h.cpu.cores * h.cpu.frequency * h.cpu.ops;
  }

  static TFLOPS(h: Host) {
    return this.FLOPS(h) / 1000000000000;
  }

  static canBeEnslavedViaSecurityProblem(h: Host, exploitVersion: number) {
    return exploitVersion > h.securityPatch;
  }

  static canBeEnslavedViaComputingTranscendence(h: Host, flops: number) {
    return flops > (constants.COMP_TRANSCENDENCE_COEF * this.FLOPS(h));
  }

  static arePortsClosed(h: Host): boolean {
    let areClosed = true;
    for (const port of Object.values(h.ports)) {
      if (port === PortStates.Opened) {
        areClosed = true;
        break;
      }
    }
    return areClosed;
  }

  static addCPUPower(host: Host, { cores, frequency, ops }: CPU) {
    host.cpu.cores += cores || 0;
    if (host.cpu.frequency < frequency) {
      host.cpu.frequency = frequency;
    }
    if (host.cpu.ops < ops) {
      host.cpu.ops = ops;
    }
    return host.cpu;
  }
}
