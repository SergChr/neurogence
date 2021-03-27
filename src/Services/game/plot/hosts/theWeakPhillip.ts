import PC from '../../entities/hosts/pc';
import { File, FileExtensions } from '../../entities/file';
import c from '../../../../Config/constants';
import { SkillNames } from '../../entities/hosts/localhost';
import { Actions } from '../../actions/actionsMap';

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
    cores: 1,
    frequency: 41000000,
    ops: 107,
  },
  securityPatch: 2,
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
    new File({
      name: 'bots_lab',
      extension: FileExtensions.C,
      values: { [SkillNames.Math]: 0.0001 },
      content: `The bots upgrade installed. You need to enable it to start creating bots.`,
      onRead: Actions.onEnableBots,
    }),
  ],
});
