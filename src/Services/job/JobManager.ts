import { UseStore } from 'zustand';

import { GameStore } from '../../Store/interfaces';
import Bot from '../game/entities/bot';
import BotWorker from './jobs/BotWorker';
import Job from './index';

export default class JobManager extends Job {
  constructor(store: UseStore<GameStore>) {
    super({ store });
    this.botWorker = new BotWorker({ store, tickInterval: 1000 });
    // console.log('constructor JobManager', this.botWorker)
  }

  botWorker: BotWorker;

  run() {
    this.store.subscribe(this.onBotsChange.bind(this), (s) => s.bots);
    // const _unsubscribe = this.store.subscribe(this.onJobChange, (s) => s.jobs);

    // TODO: check if any job existed in state before (when the app went offline)
    // need to resume their running
  }

  onBotsChange(newValue: Bot[], prev: Bot[]) {
    if (prev.length === 0 && newValue.length > 0) {
      this.botWorker.run();
    }

    if (prev.length > 0 && newValue.length === 0) {
      this.botWorker.stop();
    }
  }

  // onJobChange(a: any, b: any, c: any) {
  //   console.log('Job change fired!')
  //   console.log(a, b, c);
  // }
}