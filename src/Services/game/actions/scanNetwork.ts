import { LogEntryTypes } from '../../../Store/interfaces';
import { gameStore, logStore } from '../../../Store';
import sleep from '../../../utils/sleep';
import PC from '../entities/hosts/pc';
import { File, FileExtensions } from '../entities/file';

const game = gameStore.getState();
const log = logStore.getState();

export default async () => {
  log.write('Scanning the network...', LogEntryTypes.Trace);

  await sleep(300);
  const tuna = new PC({
    name: 'Tuna',
    cpu: {
      cores: 1,
      frequency: 1000,
      ops: 5200000,
    },
    securityPatch: 1,
    files: [
      // TODO:
    ]
  });
  game.addHost(tuna);
}
