import { UseStore } from 'zustand';

import { GameStore } from '../../Store/interfaces';
import c from '../../Config/constants';

type CreationProps = {
  store: UseStore<GameStore>;
  tickInterval?: number;
};

export default class Job {
  constructor({
    store,
    tickInterval = c.POLLING_INTERVAL,
  }: CreationProps) {
    this.store = store;
    this.tickInterval = tickInterval;
  }
  store: UseStore<GameStore>;
  tickInterval: number;
};
