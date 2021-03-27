import Chance from 'chance';

import BasicHost, { CPU, PortStates } from './basic';
import { File } from '../file';
import { HostTypes, OS } from './enums';
import getWeightedRand from '../../../../utils/getWeightedRand';
import c from '../../../../Config/constants';

const chance = new Chance();

interface ConstructorArgs {
  name: string;
  securityPatch: number;
  type?: HostTypes;
  OS?: OS;
  cpu: CPU;
  files?: File[];
  owner?: string;
  passwordSuggestions?: string[];
  password?: string;
  isDiaglyph?: boolean;
  ports?: Record<string, PortStates>;
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
      ports: p.ports,
      OS: p.OS || OS.Windows,
    });
    this.securityPatch = p.securityPatch;
    this.fs.files = p.files || [];
    this.owner = p.owner || UNKNOWN;
    this.isDiaglyph = p.isDiaglyph || false;
  }

  owner: string;
  isDiaglyph: boolean;
}

export const generateHost = (): PC => {
  return new PC({
    name: 'Unknown',
    type: getWeightedRand(c.HOST_TYPE_PREVALENCE) as HostTypes,
    OS: getWeightedRand(c.OS_PREVALENCE) as OS,
    cpu: {
      cores: chance.integer({ min: 1, max: 2 }),
      frequency: chance.integer({ min: 25000000, max: 350000000 }),
      ops: chance.integer({ min: 90, max: 210 }),
    },
    password: '1'.repeat(chance.integer({ min: 1, max: 14 })),
    ports: { 4790: PortStates.Opened },
    securityPatch: chance.integer({ min: 0, max: 18 }),
  });
}
