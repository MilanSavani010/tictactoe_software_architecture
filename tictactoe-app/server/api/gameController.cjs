const gameService = require('../application/GameService.cjs');

exports.assignPlayer = (req, res) => {
  const { sessionId, requested } = req.body;
  const assigned = gameService.assignPlayer(sessionId, requested);
  res.json({ assigned });
};

exports.makeMove = (req, res) => {
  const { player, cell } = req.body;
  const result = gameService.makeMove(player, cell);
  res.json(result);
};

exports.setPlayerName = (req, res) => {
  const { player, name } = req.body;
  gameService.setPlayerName(player, name);
  res.json({ success: true });
};

exports.reset = (_req, res) => {
  gameService.reset();
  res.json(gameService.getState());
};

exports.getState = (_req, res) => {
  res.json(gameService.getState());
};

exports.events = (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });
  res.flushHeaders();
  res.write(`data: ${JSON.stringify(gameService.getState())}\n\n`);
  gameService.subscribe(res);

  req.on('close', () => {
    gameService.removeListener(res);
    res.end();
  });
};