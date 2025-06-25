const GameService = require('../application/GameService.cjs');

describe('GameService', () => {
  let mockRepo, service;

  beforeEach(() => {
    mockRepo = {
      getGame: jest.fn(() => ({
        assignPlayer: jest.fn(() => 'X'),
        makeMove: jest.fn(() => true),
        setPlayerName: jest.fn(),
        reset: jest.fn(),
        getState: jest.fn(() => ({ board: [], currentPlayer: 'X' })),
        subscribe: jest.fn(),
        removeListener: jest.fn()
      })),
      notify: jest.fn(),
      subscribe: jest.fn(),
      removeListener: jest.fn()
    };
    service = new GameService(mockRepo);
  });

  test('assigns player and notifies listeners', () => {
    const assigned = service.assignPlayer('session1', 'X');
    expect(assigned).toBe('X');
    expect(mockRepo.notify).toHaveBeenCalled();
  });

  test('makes move and notifies listeners', () => {
    const result = service.makeMove('X', 0);
    expect(result.success).toBe(true);
    expect(mockRepo.notify).toHaveBeenCalled();
  });

  test('sets player name and notifies listeners', () => {
    service.setPlayerName('X', 'Alice');
    expect(mockRepo.notify).toHaveBeenCalled();
  });

  test('resets game and notifies listeners', () => {
    service.reset();
    expect(mockRepo.notify).toHaveBeenCalled();
  });

  test('gets state from repository', () => {
    const state = service.getState();
    expect(state).toEqual({ board: [], currentPlayer: 'X' });
  });

  test('subscribes and removes listeners', () => {
    const res = {};
    service.subscribe(res);
    expect(mockRepo.subscribe).toHaveBeenCalledWith(res);
    service.removeListener(res);
    expect(mockRepo.removeListener).toHaveBeenCalledWith(res);
  });
});