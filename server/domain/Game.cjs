class Game {
  constructor() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.playerNames = { X: '', O: '' };
    this.playerTokens = {};
  }

  assignPlayer(sessionId, requested) {
    if (this.playerTokens[sessionId]) return this.playerTokens[sessionId];
    const taken = Object.values(this.playerTokens);
    if (requested && !taken.includes(requested)) {
      this.playerTokens[sessionId] = requested;
      return requested;
    }
    const other = requested === 'X' ? 'O' : 'X';
    if (!taken.includes(other)) {
      this.playerTokens[sessionId] = other;
      return other;
    }
    return null;
  }

  makeMove(player, cell) {
    if (
      this.board[cell] === null &&
      player === this.currentPlayer &&
      cell >= 0 && cell < 9
    ) {
      this.board[cell] = player;
      this.currentPlayer = player === 'X' ? 'O' : 'X';
      return true;
    }
    return false;
  }

  setPlayerName(player, name) {
    this.playerNames[player] = name;
  }

  reset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.playerNames = { X: '', O: '' };
    this.playerTokens = {};
  }

  getState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      playerNames: this.playerNames,
      playerTokens: this.playerTokens,
    };
  }
}

module.exports = Game;