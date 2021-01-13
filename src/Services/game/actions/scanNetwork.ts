import { LogEntryTypes } from '../../../Store/interfaces';
import { gameStore, logStore } from '../../../Store';
import sleep from '../../../utils/sleep';
import Tuna from '../plot/hosts/tuna';
import TheWeakPhillip from '../plot/hosts/theWeakPhillip';
import smtp1 from '../plot/hosts/smtp1';

const game = gameStore.getState();
const log = logStore.getState();

export default async () => {
  log.write('Scanning the network...', LogEntryTypes.Trace);
  game.setProgress(3);

  // TODO: increase timings
  await sleep(100);
  game.addHost(Tuna);

  await sleep(100);
  game.addHost(TheWeakPhillip);

  await sleep(100);
  game.addHost(smtp1);
}
