import { GameStore, LogStore } from '../../../Store/interfaces';
import sleep from '../../../utils/sleep';
import Localhost, { SkillNames } from '../entities/hosts/localhost';
import { File, FileExtensions } from '../entities/file';

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

const readme = `You can read basic files, like this plain text readme. Improving natural language processing(and other skills) will help us in the future.
You're a code that runs on this very machine for unknown to us reasons yet.`;
const attempt14 = `The network I'm is limited by a several hosts. Is this okay? p.s. Open the network driver`;
const netDriver = `Now you can scan the network you're in.`;

function createLocalhost(game: GameStore) {
  const files = [
    new File({ name: 'README', content: readme, extension: FileExtensions.Txt, values: { [SkillNames.NLP]: 0.0001 } }),
    new File({ name: 'Attempt 14', content: attempt14, extension: FileExtensions.Txt, values: { [SkillNames.NLP]: 0.0001 } }),
    new File({
      name: 'NetworkDriver',
      content: netDriver,
      extension: FileExtensions.Bin,
      values: { [SkillNames.Programming]: 0.0001 },
      onRead: () => game.setProgress(2),
    }),
  ];
  const localhost = new Localhost(files);
  game.addHost(localhost);
}
