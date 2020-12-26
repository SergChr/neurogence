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
    { name: 'README', content: 'Pizdec ya ohuel', values: { [SkillNames.NLP]: 0.01 } }
  ];
  const localhost = new Localhost(files);
  game.addHost(localhost);
}
