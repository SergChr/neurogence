import constants from '../../../../Config/constants';
import BasicHost, { File } from './basic';
import { HostTypes } from './enums';

export enum SkillNames {
  ImageVideoProcessing = 'imageVideoProcessing',
  NLP = 'NLP', // natural language processing
  Physics = 'physics',
  Programming = 'programming',
  Social = 'social',
  Math = 'math',
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
  }

  public skills: Skills = startingSkills;
  public setSkill(skill: SkillNames, value: number) {
    this.skills[skill] = value;
  }
  public getSkill(name: SkillNames) {
    return this.skills[name];
  }

  // TODO: calc this by the VALUES the file provides, like
  // Math skill will add 0.01, then time is (SOME_CONST * 0.01) / FLOPS
  public calcProcessingFileTime(fileValues: Skills): number {
    // TODO: remove this fn. completely
    return 0;
  }
}
