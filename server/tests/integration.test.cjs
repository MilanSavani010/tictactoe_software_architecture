const express = require('express');
const bodyParser = require('body-parser');
const request = require('supertest');
const cors = require('cors');
const path = require('path');

// Import your real modules
const GameRepository = require('../data/GameRepository.cjs');
const GameService = require('../application/GameService.cjs');
const createGameController = require('../api/gameController.cjs');

// Setup the real service and controller
const gameRepo = new GameRepository();
const gameService = new GameService(gameRepo);
const gameController = createGameController(gameService);

// Setup the Express app for testing
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.post('/assign-player', gameController.assignPlayer);
app.post('/move', gameController.makeMove);
app.post('/reset', gameController.reset);
app.get('/state', gameController.getState);

describe('TicTacToe API Integration', () => {
  it('assigns a player', async () => {
    const res = await request(app)
      .post('/assign-player')
      .send({ sessionId: 's1', requested: 'X' });
    expect(res.body.assigned).toBe('X');
  });

  it('makes a move and updates state', async () => {
    await request(app)
      .post('/assign-player')
      .send({ sessionId: 's1', requested: 'X' });
    const moveRes = await request(app)
      .post('/move')
      .send({ player: 'X', cell: 0 });
    expect(moveRes.body.success).toBe(true);
    expect(moveRes.body.state.board[0]).toBe('X');
  });

  it('resets the game', async () => {
    await request(app)
      .post('/assign-player')
      .send({ sessionId: 's1', requested: 'X' });
    await request(app)
      .post('/move')
      .send({ player: 'X', cell: 0 });
    const resetRes = await request(app)
      .post('/reset')
      .send();
    expect(resetRes.body.board.every(cell => cell === null)).toBe(true);
    expect(resetRes.body.currentPlayer).toBe('X');
  });

  it('gets the current state', async () => {
    const res = await request(app)
      .get('/state');
    expect(res.body).toHaveProperty('board');
    expect(res.body).toHaveProperty('currentPlayer');
  });
});