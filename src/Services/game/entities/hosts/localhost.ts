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
  make(): string | void; // on performing upgrade
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
    this.exploitVersion = 10;
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

  public setSkill(skill: SkillNames, value: number) {
    this.skills[skill] = value;
  }

  public getSkill(name: SkillNames) {
    return this.skills[name]!;
  }

  addUpgrade(upgrade: Upgrade) {
    this.upgrades.push(upgrade);
  }
}
