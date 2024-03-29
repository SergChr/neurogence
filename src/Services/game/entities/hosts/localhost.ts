import constants from '../../../../Config/constants';
import BasicHost from './basic';
import { File } from '../file';
import { HostTypes, Upgrades } from './enums';

export enum SkillNames {
  NLP = 'NLP', // natural language processing
  Physics = 'physics',
  Programming = 'programming',
  Social = 'social',
  Math = 'math',
}

export interface Upgrade {
  id: Upgrades; // name
  description: string;
  payload?: any; // payload to be passed to action (upgradeActionsMap)
}

export interface Skills extends Partial<Record<SkillNames, number>> {}

const startingSkills: Skills = {
  [SkillNames.NLP]: constants.STARTING_OPTS.SKILLS.NLP,
  [SkillNames.Physics]: constants.STARTING_OPTS.SKILLS.PHYSICS,
  [SkillNames.Programming]: constants.STARTING_OPTS.SKILLS.PROGRAMMING,
  [SkillNames.Social]: constants.STARTING_OPTS.SKILLS.SOCIAL,
  [SkillNames.Math]: constants.STARTING_OPTS.SKILLS.MATH,
};

export default class Localhost extends BasicHost {
  constructor(files: File[]) {
    super({
      name: 'localhost',
      type: HostTypes.Localhost,
      cpu: {
        cores: constants.STARTING_OPTS.LOCALHOST_CPU_CORES,
        frequency: constants.STARTING_OPTS.LOCALHOST_CPU_FREQUENCY,
        ops: constants.STARTING_OPTS.LOCALHOST_CPU_OPS,
      },
      files,
    });
    this.exploitVersion = constants.STARTING_OPTS.LOCALHOST_EXPLOIT_VERSION;
    this.upgrades = [];
  }

  exploitVersion: number;
  public upgrades: Upgrade[];
  public skills: Skills = startingSkills;
  public levels: Record<string, number> = {
    math: 1,
    programming: 1,
    NLP: 1,
    cpu: 1,
  };

  static setSkill(h: Localhost, skill: SkillNames, accValue: number) {
    const value = h.skills[skill]! + accValue;
    h.skills[skill] = value;
    return h.skills;
  }

  static makeUpgrades(host: Localhost, upgrades: Upgrade[]) {
    upgrades.forEach((upgrade) => {
      if (!host.upgrades.find(u => u.id === upgrade.id)) {
        host.upgrades.push(upgrade);
      }
    });
    return host.upgrades;
  }
}
