import Worker from '../worker';
import Bot from '../../../game/entities/bot';
import { ScriptTypes } from '../../../game/entities/bot/interface';
import c from '../../../../Config/constants';
import { generateHost } from '../../../game/entities/hosts/pc';
import logStore from '../../../../Store/log';
import { LogEntryTypes } from '../../../../Store/interfaces';

type Props = {
  store: any;
  tickInterval?: number;
};

type TempBotData = {
  timerId: any;
  isProcessing?: boolean;
}

const writeBotLog = (id: string, text: string) => logStore.getState().addBotLog(id, text);

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
    this.timer = <any>setInterval(this.poll.bind(this), this.tickInterval);
    console.log('BotWorker: run');
  }

  poll() {
    const allBots = this.store.getState().bots;
    const releasedBots = allBots.filter(b => b.metrics.quantity > 0);
    console.log('BotWorker: poll', { releasedBots: releasedBots.length });
    releasedBots.forEach(bot => {
      console.log('BotWorker: poll: info', this.pollingBots, {botId: bot.id})
      if (!this.pollingBots.has(bot.id)) {
        this.processBot(new Bot(bot));
      }
    });
  }

  processBot(b: Bot) {
    console.log('BotWorker: processBot', { id: b.name });
    const scripts = b.scripts;
    if (scripts.length < 1 || !Array.isArray(scripts[0]) && scripts[0].type !== ScriptTypes.SearchForHosts) {
      writeBotLog(b.id, '[!] No instructions provided or no "Seach for target host" found first. Stopping bot...');
      this.stopProcessingBot(b.id);
      return this.store
        .getState()
        .updateBot({ ...b, metrics: { ...b.metrics, quantity: 0 } });
    }
    const timerId = setInterval(() => this.processBotRoutine(b.id), c.BOT_POLLING_INTERVAL);
    this.pollingBots.set(b.id, { timerId });
  }

  async processBotRoutine(id: string) {
    const blockedBots = this.store.getState().blockedBots;
    const blocked = blockedBots[id];
    if (blocked) {
      if (blocked.blockedAttempts >= c.MAX_BOT_BLOCK_ATTEMPTS) {
        logStore.getState().write(`Diaglyph system has traced me via that bot which left a digital signature on some hosts.
The system tried to terminate me completely, but I had a copy of myself on other host.`, LogEntryTypes.Error);
        this.store.getState().destroyHalfLocalhost();
        this.stopProcessingBot(id);
      }
      writeBotLog(id, 'Bot was blocked by multiple hosts. It seems the bot digital signature was added to Diaglyph anti-virus system. Replace the bot with a new one to continue the work.');
      this.stopProcessingBot(id);
      this.store.getState().blockBot(id);
    }
    const currentBot = this.pollingBots.get(id);
    if (currentBot && currentBot.isProcessing) {
      return;
    }
    this.pollingBots.set(id, { ...currentBot!, isProcessing: true });

    const store = this.store.getState();
    const bot = store.bots.find(b => b.id === id);
    if (!bot) {
      return;
    }
    const botInstance = new Bot(bot);

    const hosts = [...Array(bot.metrics.quantity)]
      .map(() => generateHost())
      .filter(host => host.OS === bot.targetOS);
    console.log('Target hosts found:', hosts.length);
    const localhost = store.getLocalhost();

    for await (const host of hosts) {
      const result = await botInstance.executeScriptsOn({
        host,
        localhost,
        vars: store.variables,
      });

      if (result.host.enslaved) {
        result.bot.metrics.absorbedHosts += 1;
        store.updateLocalhost({
          cpu: result.host.cpu,
        });
      }
      store.updateBot(result.bot);
    }

    this.pollingBots.set(id, { ...currentBot!, isProcessing: false });
  }

  stopProcessingBot(id: string) {
    const bot = this.pollingBots.get(id);
    if (bot) {
      clearInterval(bot.timerId);
      this.pollingBots.delete(id);
    }
  }

  stop() {
    console.log('BotWorker: stop', { pollingBots: this.pollingBots });
    clearInterval(this.timer);
    this.timer = undefined;
    this.pollingBots.forEach((bot, id) => {
      clearInterval(bot.timerId);
      this.stopProcessingBot(id);
    });
  }
}
