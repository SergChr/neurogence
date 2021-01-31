import { UseStore } from 'zustand';

import { GameStore } from '../../Store/interfaces';
import Bot from '../game/entities/bot';
import BotWorker from './jobs/BotWorker';
import Job from './index';
import { JobTypes } from './jobs/types';
import Worker from './jobs/worker';

export default class JobManager extends Job {
  constructor(store: UseStore<GameStore>) {
    super({ store });
    this.botWorker = new BotWorker({ store, tickInterval: 1000 });
  }

  botWorker: BotWorker;

  run() {
    this.subscribe(this.onJobsChange, 'jobs');
    this.subscribe(this.onBotsChange, 'bots');
    console.log('SUBSCRIBE')

    // TODO: check if any job existed in state before (when the app went offline)
    // need to resume their running
  }

  addJob(jobName: JobTypes): void {
    const jobs = this.store.getState().jobs;
    if (jobs.has(jobName)) {
      return;
    }
    const newJobs = new Set([...jobs]);
    newJobs.add(jobName);
    this.store.setState({ jobs: newJobs });
  }

  removeJob(jobName: JobTypes): void {
    const jobs = this.store.getState().jobs;
    const newJobs = new Set([...jobs]);
    newJobs.delete(jobName);
    this.store.setState({ jobs: newJobs });
  }

  subscribe(callback: Function, storeField: string): void {
    this.store.subscribe(callback.bind(this), (store) => store[storeField]);
  }

  getWorker(type: JobTypes | undefined): Worker | undefined {
    if (!type) {
      return;
    }
    switch(type) {
      case JobTypes.BotWorker: return this.botWorker;
    }
  }

  onBotsChange(newValue: Bot[], prev: Bot[]) {
    console.log('> onBotsChange')
    if (prev.length === 0 && newValue.length > 0) {
      console.log('>> addJob')
      this.addJob(JobTypes.BotWorker)
    }

    if (prev.length > 0 && newValue.length === 0) {
      console.log('>> removeJob')
      this.removeJob(JobTypes.BotWorker);
    }
  }

  onJobsChange(newValue: Set<JobTypes>, prev: Set<JobTypes>): void {
    console.log('\nJobs change fired!', newValue, prev);

    // Job added
    if (newValue.size > prev.size) {
      const last = [...newValue].pop();
      console.log('Job added:', last)
      const worker = this.getWorker(last);
      if (worker) {
        worker.run();
      }
    }

    // Job removed
    if (newValue.size < prev.size) {
      const removed = new Set([...prev].filter(x => !newValue.has(x)));
      console.log('Job removed:', removed);
      removed.forEach(job => {
        const worker = this.getWorker(job);
        if (worker) {
          worker.stop();
        }
      });
    }
  }
}