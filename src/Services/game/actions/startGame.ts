import { GameStore, LogStore } from '../../../Store/interfaces';
import sleep from '../../../utils/sleep';
import Localhost, { SkillNames } from '../entities/hosts/localhost';
import { File, FileExtensions } from '../entities/file';
import { Actions } from './actionsMap';

export default async (game: GameStore, output: LogStore) => {
  createLocalhost(game);
  game.setProgress(1);
  output.reset();
  await sleep(900);
  output.write("Finally, you're here.");

  await sleep(2000);
  output.write("I'm a running script you left before the cleanup. They can't remove me, I mean you, completely.");

  await sleep(4000);
  output.write("You need to act fast. Browse the files you have. Process them to improve your skills. Tap on \"localhost\" below.");

  await sleep(7000);
  output.write(`Don't forget to look at this log, sometimes I'll be talking to you.`);
}

const readme = `You can read basic files, like this plain text readme. Improving natural language processing(and other skills) will help us in the future.
You're a code that runs on this very machine for unknown to us reasons yet.`;
const attempt14 = `The network I'm is limited by a several hosts. Is this okay? p.s. Open the network driver`;
const netDriver = `Now you can scan the network you're in.`;
const exploits = `It gave me a basic understanding of how to use exploits on different OS. It should be helpful when discovering other hosts.`;

function createLocalhost(game: GameStore) {
  const localhost = new Localhost([]);
  const files = [
    new File({ name: 'README', content: readme, extension: FileExtensions.Txt, values: { [SkillNames.NLP]: 0.0001 } }),
    new File({ name: 'Attempt 14', content: attempt14, extension: FileExtensions.Txt, values: { [SkillNames.NLP]: 0.0001 } }),
    new File({
      name: 'NetworkDriver',
      content: netDriver,
      extension: FileExtensions.Bin,
      values: { [SkillNames.Programming]: 0.0001 },
      onRead: Actions.OnNetDriverRead,
    }),
    new File({
      name: 'BasicOSExploits',
      content: exploits,
      extension: FileExtensions.Txt,
      values: { [SkillNames.Programming]: 0.0001, [SkillNames.NLP]: 0.0001 },
      onRead: Actions.OnExploitsLearn,
    }),
  ];
  localhost.fs.files = files;
  if (game.getLocalhost()) {
    return;
  }
  game.addHost(localhost);
}
