import Chance from 'chance';

import constants from '../../../../Config/constants';
import { File } from '../file';
import { HostTypes, OS } from './enums';
import getWeightedRand from '../../../../utils/getWeightedRand';
import c from '../../../../Config/constants';

const chance = new Chance();

export interface CPU {
  cores: number;
  frequency: number;
  ops: number; // operations per cycle
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
  passwordSuggestions?: string[];
  password?: string;
  OS?: OS;
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
  }

  public readonly name: string;
  public readonly type: HostTypes;
  public cpu: CPU;
  public ports: Port[] = [];
  public readonly fs: Filesystem = {
    files: [],
  };
  enslaved = false;
  connected = false;
  password: string;
  passwordSuggestions: string[] = [];
  OS: OS;

  // 0 indicates there is no security patches, the host should be updated.
  // If not updated, it can be enslaved without any effort.
  // The greater the number, the harder to enslave the host.
  public securityPatch: number = 0;

  public get FLOPS() {
    return this.cpu.cores * this.cpu.frequency * this.cpu.ops;
  }

  public get TFLOPS() {
    return (this.cpu.cores * this.cpu.frequency * this.cpu.ops) / 1000000000000;
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

  enslave() {
    this.enslaved = true;
  }

  addCPUPower({ cores, frequency, ops }: CPU) {
    this.cpu.cores += cores;
    this.cpu.frequency += frequency;
    this.cpu.ops += ops;
  }
}

export const generateHost = (): Host => {
  return new Host({
    name: 'Unknown',
    type: getWeightedRand(c.HOST_TYPE_PREVALENCE) as HostTypes,
    OS: getWeightedRand(c.OS_PREVALENCE) as OS,
    cpu: {
      cores: chance.integer({ min: 1, max: 4 }),
      frequency: chance.integer({ min: 1000000000, max: 12000000000 }),
      ops: chance.integer({ min: 2, max: 8 }),
    },
  });
}
