import { gameStore, logStore } from '../../Store';
import startGame from './actions/startGame';

const game = gameStore.getState();
const log = logStore.getState();

class Game {
  public run() {
    if (game.progress === 0) {
      startGame(game, log);
    }
  }
}

export default new Game;
