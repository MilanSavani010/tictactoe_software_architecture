class GameService {
  constructor(gameRepo) {
    this.gameRepo = gameRepo;
  }

  assignPlayer(sessionId, requested) {
    const assigned = this.gameRepo.getGame().assignPlayer(sessionId, requested);
    this.gameRepo.notify();
    return assigned;
  }

  makeMove(player, cell) {
    const success = this.gameRepo.getGame().makeMove(player, cell);
    this.gameRepo.notify();
    return { success, state: this.gameRepo.getGame().getState() };
  }

  setPlayerName(player, name) {
    this.gameRepo.getGame().setPlayerName(player, name);
    this.gameRepo.notify();
  }

  reset() {
    this.gameRepo.getGame().reset();
    this.gameRepo.notify();
  }

  getState() {
    return this.gameRepo.getGame().getState();
  }

  subscribe(res) {
    this.gameRepo.subscribe(res);
  }

  removeListener(res) {
    this.gameRepo.removeListener(res);
  }
}

module.exports = GameService;