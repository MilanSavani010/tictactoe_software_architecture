function createGameController(gameService) {
  return {
    assignPlayer: (req, res) => {
      const { sessionId, requested } = req.body;
      const assigned = gameService.assignPlayer(sessionId, requested);
      res.json({ assigned });
    },

    makeMove: (req, res) => {
      const { player, cell } = req.body;
      const result = gameService.makeMove(player, cell);
      res.json(result);
    },

    setPlayerName: (req, res) => {
      const { player, name } = req.body;
      gameService.setPlayerName(player, name);
      res.json({ success: true });
    },

    reset: (_req, res) => {
      gameService.reset();
      res.json(gameService.getState());
    },

    getState: (_req, res) => {
      res.json(gameService.getState());
    },

    events: (req, res) => {
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
    }
  };
}

module.exports = createGameController;