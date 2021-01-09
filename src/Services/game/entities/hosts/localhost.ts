import constants from '../../../../Config/constants';
import BasicHost from './basic';
import { File } from '../file';
import { HostTypes, Upgrades } from './enums';

export enum SkillNames {
  ImageVideoProcessing = 'imageVideoProcessing',
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
  [SkillNames.ImageVideoProcessing]: constants.STARTING_OPTS.SKILLS.IMG_VIDEO_PROCESS,
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
    this.exploitVersion = 0;
    this.upgrades = [];
  }

  exploitVersion: number;
  public upgrades: Upgrade[];

  public skills: Skills = startingSkills;
  public setSkill(skill: SkillNames, value: number) {
    this.skills[skill] = value;
  }
  public getSkill(name: SkillNames) {
    return this.skills[name];
  }

  addUpgrade(upgrade: Upgrade) {
    this.upgrades.push(upgrade);
  }
}
