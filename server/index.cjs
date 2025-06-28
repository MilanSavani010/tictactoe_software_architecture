const express = require('express');
const cors = require('cors');
require('reflect-metadata');
const path = require('path');
const container = require('./container.cjs');
const createGameController = require('./api/gameController.cjs');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/s231063', express.static(path.join(__dirname, '../public')));


// Resolve dependencies using DI container
const gameService = container.resolve('GameService');
const gameController = createGameController(gameService);

// Routes
app.post('/s231063/set-name', gameController.setPlayerName);
app.post('/s231063/assign-player', gameController.assignPlayer);
app.post('/s231063/move', gameController.makeMove);
app.post('/s231063/reset', gameController.reset);
app.get('/s231063/state', gameController.getState);
app.get('/s231063/events', gameController.events);

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`TicTacToe backend running on port ${PORT}`);
});