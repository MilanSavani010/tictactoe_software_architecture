const GameRepository = require('../data/GameRepository.cjs');

describe('GameRepository', () => {
  let repo;

  beforeEach(() => {
    repo = new GameRepository();
  });

  test('initializes with a Game instance', () => {
    expect(repo.getGame()).toBeDefined();
    expect(typeof repo.getGame().getState).toBe('function');
  });

  test('adds and removes listeners correctly', () => {
    const res1 = { write: jest.fn() };
    const res2 = { write: jest.fn() };
    repo.subscribe(res1);
    repo.subscribe(res2);
    expect(repo.listeners).toContain(res1);
    expect(repo.listeners).toContain(res2);

    repo.removeListener(res1);
    expect(repo.listeners).not.toContain(res1);
    expect(repo.listeners).toContain(res2);
  });

  test('notifies all listeners with game state', () => {
    const res1 = { write: jest.fn() };
    const res2 = { write: jest.fn() };
    repo.subscribe(res1);
    repo.subscribe(res2);
    repo.notify();
    expect(res1.write).toHaveBeenCalled();
    expect(res2.write).toHaveBeenCalled();
  });
});