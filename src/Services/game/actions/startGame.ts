import { GameStore, LogStore } from '../../../Store/interfaces';
import sleep from '../../../utils/sleep';
import Localhost, { SkillNames } from '../entities/hosts/localhost';
import { File } from '../entities/hosts/basic';

export default async (game: GameStore, output: LogStore) => {
  output.reset();
  await sleep(10);
  output.writeLog("Finally, you're here.");

  await sleep(200);
  output.writeLog("I'm a running script you left before the cleanup. They can't remove me, I mean you, completely.");

  await sleep(500);
  output.writeLog("You need to act fast. Browse the files you have. Process them to improve your skills. Tap on \"localhost\" below.");

  await sleep(1000);
  createLocalhost(game);

  game.setProgress(1);
}

function createLocalhost(game: GameStore) {
  // TODO: create files for localhost
  const files: File[] = [
    { name: 'README', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'Leave_me_alone.txt', content: 'Please leave me alone pal', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'pancake.exe', content: '010001010001110101010100010110111001101010000010110000101100001', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'aaaaaa', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'bbbb', content: 'It is a BBBBBBB', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'ccc', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'ddd', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'eee', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'ffff', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'ggg', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'efr', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'tghyyy', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'vdvdfv', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'dsad', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'rwrwe', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: 'few', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: '11111', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: '2222', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: '333', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
    { name: '4444', content: 'SUCCESSSSSSSSSSSSSSSSSSSSs', values: { [SkillNames.NLP]: 0.01 } },
  ];
  const localhost = new Localhost(files);
  game.addHost(localhost);
}
