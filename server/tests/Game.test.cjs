 const Game = require('../domain/Game.cjs');

describe('Game domain logic', () => {
  let game;

  beforeEach(() => {
    game = new Game();
  });

  test('starts with empty board and X as current player', () => {
    expect(game.board).toHaveLength(9);
    expect(game.currentPlayer).toBe('X');
  });

  test('assigns player if not taken', () => {
    const assigned = game.assignPlayer('session1', 'X');
    expect(assigned).toBe('X');
    expect(game.playerTokens['session1']).toBe('X');
  });

  test('does not assign player if both tokens taken', () => {
    game.assignPlayer('s1', 'X');
    game.assignPlayer('s2', 'O');
    const assigned = game.assignPlayer('s3', 'X');
    expect(assigned).toBeNull();
  });

  test('makes a valid move and switches player', () => {
    game.assignPlayer('s1', 'X');
    const moved = game.makeMove('X', 0);
    expect(moved).toBe(true);
    expect(game.board[0]).toBe('X');
    expect(game.currentPlayer).toBe('O');
  });

  test('does not allow invalid move', () => {
    game.assignPlayer('s1', 'X');
    game.makeMove('X', 0);
    const moved = game.makeMove('X', 0);
    expect(moved).toBe(false);
  });

  test('resets the game', () => {
    game.assignPlayer('s1', 'X');
    game.makeMove('X', 0);
    game.reset();
    expect(game.board.every(cell => cell === null)).toBe(true);
    expect(game.currentPlayer).toBe('X');
  });
});