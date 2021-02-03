import Worker from '../worker';
import Bot from '../../../game/entities/bot';
import { ScriptTypes } from '../../../game/entities/bot/interface';
import c from '../../../../Config/constants';
import Host, { generateHost } from '../../../game/entities/hosts/basic';

type Props = {
  store: any;
  tickInterval?: number;
};

type TempBotData = {
  timerId: any;
  currentHost?: Host;
  skipTicks?: number;
}

export default class BotWorker extends Worker {
  constructor({ store, tickInterval }: Props) {
    super({ store });
    this.tickInterval = tickInterval || this.tickInterval;
    this.pollingBots = new Map();
  }

  timer: any;
  pollingBots: Map<string, TempBotData>;

  run() {
    if (this.timer) {
      return;
    }
    console.log('BotWorker.run');
    this.timer = <any>setInterval(this.poll.bind(this), this.tickInterval);
  }

  poll() {
    const allBots = this.store.getState().bots;
    console.log('BotWorker.poll');
    const releasedBots = allBots.filter(b => b.metrics.quantity > 0);
    releasedBots.forEach(bot => {
      if (!this.pollingBots.has(bot.id)) {
        this.processBot(bot);
      }
    });
  }

  processBot(b: Bot) {
    console.log('BotWorker.processBot');
    const scripts = b.scripts;
    if (scripts.length < 1 || !Array.isArray(scripts[0]) && scripts[0].type !== ScriptTypes.SearchForHosts) {
      this.stopProcessingBot(b.id);
      return this.store
        .getState()
        .updateBot({ ...b, metrics: { ...b.metrics, quantity: 0 } });
    }
    const timerId = setInterval(() => this.processBotRoutine(b.id), c.BOT_POLLING_INTERVAL);
    this.pollingBots.set(b.id, { timerId });
  }

  processBotRoutine(id: string) {
    const bot = this.store.getState().bots.find(b => b.id === id);
    // TODO: hosts quantity === bot.quantity
    console.log('BotWorker.processBotRoutine');
    const randomHost = generateHost();
    // console.log('generated host', randomHost);
    // console.log('bot', bot);
    if (randomHost.OS === bot?.targetOS) {
      console.log('a host found');
    }
  }

  stopProcessingBot(id: string) {
    const bot = this.pollingBots.get(id);
    if (bot) {
      clearInterval(bot.timerId);
      this.pollingBots.delete(id);
    }
  }

  stop() {
    clearInterval(this.timer);
    this.timer = undefined;
    this.pollingBots.forEach(({ timerId }) => clearInterval(timerId));
  }
}
