import { LogEntryTypes } from '../../../Store/interfaces';
import { gameStore, logStore } from '../../../Store';
import sleep from '../../../utils/sleep';
import Tuna from '../plot/hosts/tuna';

const game = gameStore.getState();
const log = logStore.getState();

export default async () => {
  log.write('Scanning the network...', LogEntryTypes.Trace);
  game.setProgress(3);

  // TODO: increase timings
  await sleep(300);
  game.addHost(Tuna);
}
