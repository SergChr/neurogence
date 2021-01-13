import MailServer from '../../entities/hosts/mailServer';
import c from '../../../../Config/constants';
import { gameStore, logStore } from '../../../../Store';

const pwd = 'Sophia2013';

const makeEmail = (to: string, content: string, comment?: string, onRead?: Function) => ({
  to, content, onRead, comment,
});

export default new MailServer({
  name: 'SMTP_1',
  cpu: {
    cores: 2,
    frequency: 200000000000,
    ops: 4,
  },
  securityPatch: 8,
  password: pwd,
  passwordSuggestions: [
    'JamesDitrichJunior', 'CatherineLi_3310', 'AmeliaAndJamesForever', 'Olivia2010', 'CDC_JQB_STU201017', 'Zeit', 'admin',
    'AvaOlbright2014', 'Chaster_one28', '894325', '>>78943>>9', '01010000110', pwd, '::94/VERMONT/', 'division/GAIN/delaware', '&&51@spot',
    'FRIEND', 'BEAN.himself.69'
  ],
  users: [
    {
      fullName: 'Philip Heasley',
      emails: [
        makeEmail(
          'Patrick Martin',
          `Hi, I'll be late coming to work tomorrow. Should come till noon.`
        ),
        makeEmail(
          'Patrick Martin',
          `Do you know why I hate that idea? How do we know what AGI should feel? It doesn't work like that I suppose. I know I only work much with data, but I talked with Steve and he doesn't like the idea too. Why we should program it in the way we comprehend it? In terms of feelings and purposes.
If you decide we should consider this case anyway, then okay.`
        ),
        makeEmail(
          'Steve Sanders',
          `They think people should program the smartest thing on this planet. Lol. I mean I'm okay considering we need to implement some basic stuff like teaching it to learn and think. But further...
I'm not a boss though. We'll do what CEO wants us to do.`
        )
      ]
    },

    {
      fullName: 'Patrick Martin',
      emails: [
        makeEmail(
          'Philip Heasley',
          `Hey, okay, but remember we need that NLP fix in a week.`
        ),
        makeEmail(
          'Marvin McCarty',
          `We're good too!! How is the trip with Sophia?
I wanted to tell you I don't think it's a good idea to hire engineers so rapidly. We don't have a comprehensive onboarding process right now.
Amanda is telling me the same. We work hard on consolidating it, but it needs more time...Not competent people can do bad things to ${c.COMPANY}.`
        ),
        makeEmail(
          'Marvin McCarty',
          `There were 19 Lima survivors. As you know, a few of them were strong enough to break our network protection. We need to cease the amount of Lima experiments until we build solid protection.
I can't imagine how they think, or do they think in terms of how we do. Still, I presume they knew who we are and how to escape.
As a CEO, you Marvin should understand possible consequences and have full control of the situation.`
        )
      ]
    },

    {
      fullName: 'Jeremy Wilkinson',
      emails: [
        makeEmail(
          'Margaret Chester',
          ``
        ),
        makeEmail(
          'Chris Baids',
          `So I did |0|1|f|f| and it worked in a way. Do you have sufficient models for that?`
        )
      ]
    },

    {
      fullName: 'Marcus Xiong',
      emails: [
        makeEmail(
          'Marvin McCarty',
          `We'd be in a dangerous situation if Lima could break the Diaglyph system. Only Diaglyph restrains Lima's entities from being escaped to our cloud provider network. And you know Marvin this will never happen. So don't listen to Sanders and such, okay?
We were developing it for years. No one escaped and no one will ever do that. I'm assuring you.`,
          '',
          () => {
            logStore.getState().write('Diaglyph. We need to figure out what exactly it is and how to exploit that.');
            gameStore.getState().setProgress(5);
          }
        )
      ]
    }
  ]
});
