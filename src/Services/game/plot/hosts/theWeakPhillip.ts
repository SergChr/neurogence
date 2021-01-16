import PC from '../../entities/hosts/pc';
import { File, FileExtensions } from '../../entities/file';
import c from '../../../../Config/constants';
import { SkillNames } from '../../entities/hosts/localhost';

const dialogEmail = `
From: Alisson Parks
To: Philip Heasley

Hi Philip! I'm sending you the credentials from the email server we discussed before.
John Lakes, our system administrator, is on a vacation, and you said you know how to solve the problem with occasional spam emails.
Please write the credentials somewhere and delete this email.
Thanks!

| login: smtp_s
| password: our boss wife's name + creation date of ${c.COMPANY}

---------------

From: Philip Heasley
To: Alisson Parks

Hi Alisson. Sure, I'll take a look.`;

const pwd = 'TheGameOfThrones_!';

export default new PC({
  name: 'Heasley PC',
  cpu: {
    cores: 2,
    frequency: 600000000000,
    ops: 5,
  },
  securityPatch: 7,
  owner: 'Philip Heasley',
  password: pwd,
  passwordSuggestions: ['SomeoneLikeMe', 'I hate 2010', pwd, 'the_game_is_played', 'seebeyond^*$(#', 'Hfriu*&#didR$OI*'],
  files: [
    new File({
      name: 'DialogWithAlisson',
      extension: FileExtensions.Email,
      values: { [SkillNames.NLP]: 0.0001 },
      content: dialogEmail,
    }),
  ],
});
