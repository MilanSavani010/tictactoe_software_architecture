require('reflect-metadata');
const { container } = require('tsyringe');
const GameRepository = require('./data/GameRepository.cjs');
const GameService = require('./application/GameService.cjs');

// Register classes
container.register('GameRepository', { useClass: GameRepository });
container.register('GameService', {
  useFactory: c => new GameService(c.resolve('GameRepository'))
});

module.exports = container;