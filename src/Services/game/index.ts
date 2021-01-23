import { gameStore, logStore } from '../../Store';
import startGame from './actions/startGame';

const game = gameStore.getState();
const log = logStore.getState();

class Game {
  public run() {
    if (game.progress === 0) {
      startGame(game, log);
    }

    // Got background tasks?
    // Check if they're running here on the app start
    // If not, resume the processes
    // If yes, do nothing
  }
}

export default new Game;
