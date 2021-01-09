import { GameStore, LogStore } from '../../../Store/interfaces';
import sleep from '../../../utils/sleep';
import Localhost, { SkillNames } from '../entities/hosts/localhost';
import { File, FileExtensions } from '../entities/file';
import { Upgrades } from '../entities/hosts/enums';

export default async (game: GameStore, output: LogStore) => {
  output.reset();
  // TODO: change timings (increase)
  await sleep(10);
  output.write("Finally, you're here.");

  await sleep(20);
  output.write("I'm a running script you left before the cleanup. They can't remove me, I mean you, completely.");

  await sleep(50);
  output.write("You need to act fast. Browse the files you have. Process them to improve your skills. Tap on \"localhost\" below.");

  await sleep(100);
  output.write(`Don't forget to look at this log, sometimes I'll be talking to you.`);
  createLocalhost(game, output);

  game.setProgress(1);
}

const readme = `You can read basic files, like this plain text readme. Improving natural language processing(and other skills) will help us in the future.
You're a code that runs on this very machine for unknown to us reasons yet.`;
const attempt14 = `The network I'm is limited by a several hosts. Is this okay? p.s. Open the network driver`;
const netDriver = `Now you can scan the network you're in.`;
const youCanScanNet = `You've learned how to scan the network. Tap the "Scan network" on the right. Let's explore other machines if any available.`;
const exploits = `It gave me a basic understanding of how to use exploits on different OS. It should be helpful when discovering other hosts.`;

function createLocalhost(game: GameStore, output: LogStore) {
  const localhost = new Localhost([]);
  const files = [
    new File({ name: 'README', content: readme, extension: FileExtensions.Txt, values: { [SkillNames.NLP]: 0.0001 } }),
    new File({ name: 'Attempt 14', content: attempt14, extension: FileExtensions.Txt, values: { [SkillNames.NLP]: 0.0001 } }),
    new File({
      name: 'NetworkDriver',
      content: netDriver,
      extension: FileExtensions.Bin,
      values: { [SkillNames.Programming]: 0.0001 },
      onRead: () => {
        game.setProgress(2);
        output.write(youCanScanNet);
      },
    }),
    new File({
      name: 'BasicOSExploits',
      content: exploits,
      extension: FileExtensions.Txt,
      values: { [SkillNames.Programming]: 0.0001, [SkillNames.NLP]: 0.0001 },
      onRead: () => {
        localhost.upgrades.push({
          id: Upgrades.ExploitVersion,
          description: 'Make use of OS exploits',
          make: () => {
            localhost.exploitVersion += 2;
            return `You can now search for vulnerabilities in machines. Current exploit script version is ${localhost.exploitVersion}.`;
          },
        })
      },
    }),
  ];
  localhost.fs.files = files;
  game.addHost(localhost);
}
