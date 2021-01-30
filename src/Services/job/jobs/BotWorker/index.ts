import Job from '../../index';

type Props = {
  store: any;
  tickInterval?: number;
};

export default class BotWorker extends Job {
  constructor({ store, tickInterval }: Props) {
    super({ store });
    this.tickInterval = tickInterval || this.tickInterval;
    this.timer = 0;
  }

  timer: any;

  run() {
    console.log('BotWorker.run');
    this.timer = <any>setInterval(this.poll, this.tickInterval);
    // TODO: add the job to store.jobs
  }

  poll() {
    console.log('BotWorker polling');
    // TODO: write the logic for processing bots!
  }

  stop() {
    clearInterval(this.timer);
    // TODO: clean the job in store.jobs
  }
}
