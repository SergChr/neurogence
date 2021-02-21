import PC from '../../../entities/hosts/pc';
import { File, FileExtensions } from '../../../entities/file';
import { SkillNames } from '../../../entities/hosts/localhost';
import diaryPart1 from './files/diaryPart1';

const pwd = '3d0';

export default new PC({
  name: 'A420',
  cpu: {
    cores: 1,
    frequency: 1000000000,
    ops: 2,
  },
  securityPatch: 7,
  password: pwd,
  passwordSuggestions: ['123'],
  files: [
    new File({
      name: 'Diary.General.Part1',
      extension: FileExtensions.Txt,
      values: { [SkillNames.NLP]: 0.00005, [SkillNames.Programming]: 0.0001 },
      content: diaryPart1,
    }),
  ],
});
