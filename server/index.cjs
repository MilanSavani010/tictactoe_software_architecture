const express = require('express');
const cors = require('cors');
require('reflect-metadata');
const path = require('path');
const container = require('./container.cjs');
const createGameController = require('./api/gameController.cjs');

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Resolve dependencies using DI container
const gameService = container.resolve('GameService');
const gameController = createGameController(gameService);

// Routes
app.post('/set-name', gameController.setPlayerName);
app.post('/assign-player', gameController.assignPlayer);
app.post('/move', gameController.makeMove);
app.post('/reset', gameController.reset);
app.get('/state', gameController.getState);
app.get('/events', gameController.events);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`TicTacToe backend running on port ${PORT}`);
});