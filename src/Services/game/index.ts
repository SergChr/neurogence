import { gameStore, logStore } from '../../Store';
import startGame from './actions/startGame';
import handleGameProgress from './actions/handleGameProgress';
import c from '../../Config/constants';
import JobManager from '../job/JobManager';

const jobManager = new JobManager(gameStore);

class Game {
  public run() {
    const game = gameStore.getState();
    const log = logStore.getState();
    if (game.hosts.length === 0) {
      startGame(game, log);
    }

    jobManager.run();
    
    this.startPolling();
  }

  startPolling() {
    setInterval(this.poll.bind(this), c.POLLING_INTERVAL);
  }

  poll() {
    handleGameProgress();
  }
}

export default new Game;
