import { UseStore } from 'zustand';

import { GameStore } from '../../Store/interfaces';
import { BotData } from '../game/entities/bot';
import BotWorker from './jobs/BotWorker';
import Job from './index';
import { JobTypes } from './jobs/types';
import Worker from './jobs/worker';
import c from '../../Config/constants';

export default class JobManager extends Job {
  constructor(store: UseStore<GameStore>) {
    super({ store });
    // TODO: adjust tickInterval, use constant
    this.botWorker = new BotWorker({ store, tickInterval: c.BOT_POLLING_INTERVAL });
  }

  botWorker: BotWorker;

  run() {
    this.subscribe(this.onJobsChange, 'jobs');
    this.subscribe(this.onBotsChange, 'bots');

    // Check if any job existed in state before (when the app went offline)
    // need to resume their running
    // TODO: test job handling when device went offline with persistent store
    const jobs = this.store.getState().jobs;
    if (jobs.size > 0) {
      this.resumeRunningJobs(jobs);
    }
  }

  resumeRunningJobs(jobs: Set<JobTypes>) {
    jobs.forEach(job => {
      const worker = this.getWorker(job);
      if (worker) {
        worker.run();
      }
    });
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
    if (!jobs.has(jobName)) {
      return;
    }
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

  onBotsChange(newValue: BotData[]) {
    const hasReleasedBots = newValue.some(b => b.metrics.quantity > 0);
    if (hasReleasedBots) {
      console.log('>> addJob');
      this.addJob(JobTypes.BotWorker);
    } else {
      console.log('>> removeJob')
      this.removeJob(JobTypes.BotWorker);
    }
  }

  onJobsChange(newValue: Set<JobTypes>, prev: Set<JobTypes>): void {
    console.log('Jobs change fired!', newValue, prev);

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