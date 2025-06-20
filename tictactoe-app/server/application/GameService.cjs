const gameRepo = require('../data/GameRepository.cjs');

class GameService {
  assignPlayer(sessionId, requested) {
    const assigned = gameRepo.getGame().assignPlayer(sessionId, requested);
    gameRepo.notify();
    return assigned;
  }

  makeMove(player, cell) {
    const success = gameRepo.getGame().makeMove(player, cell);
    gameRepo.notify();
    return { success, state: gameRepo.getGame().getState() };
  }

  setPlayerName(player, name) {
    gameRepo.getGame().setPlayerName(player, name);
    gameRepo.notify();
  }

  reset() {
    gameRepo.getGame().reset();
    gameRepo.notify();
  }

  getState() {
    return gameRepo.getGame().getState();
  }

  subscribe(res) {
    gameRepo.subscribe(res);
  }

  removeListener(res) {
    gameRepo.removeListener(res);
  }
}

module.exports = new GameService();