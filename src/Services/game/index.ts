import { gameStore, logStore } from '../../Store';
import startGame from './actions/startGame';
// import c from '../../Config/constants';
import JobManager from '../job/JobManager';

const game = gameStore.getState();
const log = logStore.getState();

const jobManager = new JobManager(gameStore);

class Game {
  public run() {
    if (game.progress === 0) {
      startGame(game, log);
    }

    jobManager.run();
    
    // this.startPolling();
  }

  // startPolling() {
  //   setInterval(this.poll, c.POLLING_INTERVAL);
  // }

  // = game tick
  // poll() {
    // Got background tasks?
    // Check if they're running here on the app start
    // If not, resume the processes
    // If yes, do nothing
  // }
}

export default new Game;
