const Game = require('../domain/Game.cjs');

class GameRepository {
  constructor() {
    this.game = new Game();
    this.listeners = [];
  }

  getGame() {
    return this.game;
  }

  subscribe(res) {
    this.listeners.push(res);
  }

  notify() {
    const data = `data: ${JSON.stringify(this.game.getState())}\n\n`;
    this.listeners.forEach(res => res.write(data));
  }

  removeListener(res) {
    this.listeners = this.listeners.filter(r => r !== res);
  }
}

module.exports = GameRepository;