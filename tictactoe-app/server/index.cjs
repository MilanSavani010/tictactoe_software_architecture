const express = require('express');
const cors = require('cors');
const gameState = require('./gameState.cjs');

const app = express();
app.use(cors());
app.use(express.json());

this.playerNames = { X: '', O: '' };

// Add endpoint to set name
app.post('/set-name', (req, res) => {
  const { player, name } = req.body;
  gameState.playerNames[player] = name;
  gameState.notify();
  res.json({ success: true });
});

// SSE endpoint
app.get('/events', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();

  // Send initial state
  res.write(`data: ${JSON.stringify(gameState.getState())}\n\n`);
  gameState.subscribe(res);

  req.on('close', () => {
    gameState.removeListener(res);
    res.end();
  });
});

// Assign player token (X or O) based on sessionId and requested role
app.post('/assign-player', (req, res) => {
  const { sessionId, requested } = req.body;
  const assigned = gameState.assignPlayer(sessionId, requested);
  res.json({ assigned });
});

app.get('/state', (_req, res) => {
  res.json(gameState.getState());
});

app.post('/move', (req, res) => {
  const { player, cell } = req.body;
  const result = gameState.makeMove(player, cell);
  res.json(result);
});

app.post('/reset', (_req, res) => {
  gameState.reset();
  res.json(gameState.getState());
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`TicTacToe backend running on port ${PORT}`);
});