import { UseStore } from 'zustand';

import { GameStore } from '../../Store/interfaces';
import { BotData } from '../game/entities/bot';
import BotWorker from './jobs/BotWorker';
import Job from './index';
import { JobTypes } from './jobs/types';
import Worker from './jobs/worker';
import c from '../../Config/constants';
import SkillWorker from './jobs/SkillWorker';

export default class JobManager extends Job {
  constructor(store: UseStore<GameStore>) {
    super({ store });
    this.botWorker = new BotWorker({ store, tickInterval: c.BOT_POLLING_INTERVAL });
    this.skillWorker = new SkillWorker({ store, tickInterval: c.SKILLS_IMPROVING_INTERVAL });
  }

  botWorker: BotWorker;
  skillWorker: SkillWorker;

  run() {
    this.subscribe('jobs', this.onJobsChange);
    this.subscribe('bots', this.onBotsChange);

    // Check if any job existed in state before (when the app went offline)
    // need to resume their running
    // TODO: test job handling when device went offline with persistent store
    const jobs = this.store.getState().jobs;
    if (jobs.length > 0) {
      this.resumeRunningJobs(jobs);
    }
  }

  resumeRunningJobs(jobs: JobTypes[]) {
    jobs.forEach(job => {
      const worker = this.getWorker(job);
      if (worker) {
        worker.run();
      }
    });
  }

  hasJob(job: JobTypes): boolean {
    return !!this.store.getState().jobs.find(j => j === job);
  }

  addJob(jobName: JobTypes): void {
    const jobs = this.store.getState().jobs;
    if (this.hasJob(jobName)) {
      return;
    }
    const newJobs = [...jobs];
    newJobs.push(jobName);
    this.store.setState({ jobs: newJobs });
  }

  removeJob(jobName: JobTypes): void {
    const jobs = this.store.getState().jobs;
    if (!this.hasJob(jobName)) {
      return;
    }
    const newJobs = [...jobs];
    const index = jobs.findIndex(j => j === jobName);
    newJobs.splice(index, 1);
    this.store.setState({ jobs: newJobs });
  }

  subscribe(storeField: string, callback: Function): void {
    this.store.subscribe(callback.bind(this), (store) => store[storeField]);
  }

  getWorker(type: JobTypes | undefined): Worker | undefined {
    if (!type) {
      return;
    }
    switch(type) {
      case JobTypes.BotWorker: return this.botWorker;
      case JobTypes.SkillWorker: return this.skillWorker;
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

  onJobsChange(newValue: JobTypes[], prev: JobTypes[]): void {
    console.log('Jobs change fired!', {newValue, prev});

    // Job added
    if (newValue.length > prev.length) {
      const last = [...newValue].pop();
      console.log('Job added:', last)
      const worker = this.getWorker(last);
      if (worker) {
        worker.run();
      }
    }

    // Job removed
    if (newValue.length < prev.length) {
      const removed = new Set([...prev].filter(x => !newValue.includes(x)));
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