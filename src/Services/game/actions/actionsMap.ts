import gameStore from '../../../Store/game';
import logStore from '../../../Store/log';
import { Upgrades } from '../entities/hosts/enums';
import { LogEntryTypes } from '../../../Store/interfaces';

const game = gameStore.getState;
const log = logStore.getState;

export enum Actions {
  OnNetDriverRead = 'OnNetDriverRead',
  OnExploitsLearn = 'OnExploitsLearn',
  OnReadLimaReport = 'OnReadLimaReport',
  OnReadImproveMetricsPanel = 'OnReadMetricsImprove',
}

export default {
  [Actions.OnNetDriverRead]: () => {
    game().setProgress(2);
    log().write(`You've learned how to scan the network. Tap the "Scan network" on the bottom right. Let's explore other machines if any available.`);
  },
  [Actions.OnExploitsLearn]: () => {
    game().updateLocalhost({
      upgrades: [{
        id: Upgrades.ExploitVersion,
        description: 'Make use of OS exploits',
      }],
    });
  },
  [Actions.OnReadLimaReport]: () => {
    log().write(`So a company runs experiments on creating AGIs. I'm a part of the Lima experiment given I'm still running and can read those reports.`);
  },
  [Actions.OnReadImproveMetricsPanel]: () => {
    if (game().upgrades[Upgrades.MetricsPanel]) {
      return;
    }
    game().updateLocalhost({
      upgrades: [{
        id: Upgrades.MetricsPanel,
        description: 'Improve the metrics panel',
      }],
    });
    log().write(`Metrics panel upgrade is available.`, LogEntryTypes.Trace);
  },
};
