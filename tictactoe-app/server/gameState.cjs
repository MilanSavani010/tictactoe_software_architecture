class GameState {
  constructor() {
    this.listeners = []; // Initialize listeners first!
    this.playerNames = { X: '', O: '' };
    this.playerTokens = {}; // Maps sessionId to 'X' or 'O'
    this.reset();
  }

  reset() {
    this.board = Array(9).fill(null);
    this.currentPlayer = 'X';
    this.playerNames = { X: '', O: '' };
    this.playerTokens = {};
    this.notify();

  }

  getState() {
    return {
      board: this.board,
      currentPlayer: this.currentPlayer,
      playerNames: this.playerNames,
      playerTokens: this.playerTokens
    };
  }

    
  assignPlayer(sessionId, requested) {
    // If already assigned, return existing
    if (this.playerTokens[sessionId]) return this.playerTokens[sessionId];

    // If requested is available, assign it
    const taken = Object.values(this.playerTokens);
    if (requested && !taken.includes(requested)) {
      this.playerTokens[sessionId] = requested;
      this.notify();
      return requested;
    }
    // Otherwise, assign the other if available
    const other = requested === 'X' ? 'O' : 'X';
    if (!taken.includes(other)) {
      this.playerTokens[sessionId] = other;
      this.notify();
      return other;
    }
    // If both taken, return null
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
      this.notify();
      return { success: true, state: this.getState() };
    }
    return { success: false, state: this.getState() };
  }

  setPlayerName(player, name) {
    this.playerNames[player] = name;
    this.notify();
  }

  subscribe(res) {
    this.listeners.push(res);
  }

  notify() {
    const data = `data: ${JSON.stringify(this.getState())}\n\n`;
    this.listeners.forEach(res => res.write(data));
  }

  removeListener(res) {
    this.listeners = this.listeners.filter(r => r !== res);
  }
}

module.exports = new GameState();