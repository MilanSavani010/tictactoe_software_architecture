const express = require('express');
const cors = require('cors');
const gameController = require('./api/gameController.cjs');

const app = express();
app.use(cors());
app.use(express.json());

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