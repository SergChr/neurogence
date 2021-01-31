import Worker from '../worker';

type Props = {
  store: any;
  tickInterval?: number;
};

export default class BotWorker extends Worker {
  constructor({ store, tickInterval }: Props) {
    super({ store });
    this.tickInterval = tickInterval || this.tickInterval;
    this.timer = 0;
  }

  timer: any;

  run() {
    console.log('BotWorker.run');
    this.timer = <any>setInterval(this.poll, this.tickInterval);
  }

  poll() {
    console.log('BotWorker.poll');
    // TODO: write the logic for processing bots!
  }

  stop() {
    clearInterval(this.timer);
  }
}
