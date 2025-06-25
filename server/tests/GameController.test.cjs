const createGameController = require('../api/gameController.cjs');

describe('GameController', () => {
  let mockService, controller, req, res;

  beforeEach(() => {
    mockService = {
      assignPlayer: jest.fn(() => 'X'),
      makeMove: jest.fn(() => ({ success: true, state: {} })),
      setPlayerName: jest.fn(),
      reset: jest.fn(),
      getState: jest.fn(() => ({})),
      subscribe: jest.fn(),
      removeListener: jest.fn()
    };
    controller = createGameController(mockService);
    req = { body: {}, on: jest.fn() };
    res = { json: jest.fn(), set: jest.fn(), flushHeaders: jest.fn(), write: jest.fn(), end: jest.fn() };
  });

  test('assignPlayer responds with assigned player', () => {
    req.body = { sessionId: 's1', requested: 'X' };
    controller.assignPlayer(req, res);
    expect(res.json).toHaveBeenCalledWith({ assigned: 'X' });
  });

  test('makeMove responds with result', () => {
    req.body = { player: 'X', cell: 0 };
    controller.makeMove(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: true, state: {} });
  });

  test('setPlayerName responds with success', () => {
    req.body = { player: 'X', name: 'Alice' };
    controller.setPlayerName(req, res);
    expect(res.json).toHaveBeenCalledWith({ success: true });
  });

  test('reset responds with state', () => {
    mockService.getState.mockReturnValue({ board: [] });
    controller.reset(req, res);
    expect(res.json).toHaveBeenCalledWith({ board: [] });
  });

  test('getState responds with state', () => {
    mockService.getState.mockReturnValue({ board: [] });
    controller.getState(req, res);
    expect(res.json).toHaveBeenCalledWith({ board: [] });
  });

  test('events sets headers and subscribes', () => {
    controller.events(req, res);
    expect(res.set).toHaveBeenCalled();
    expect(res.flushHeaders).toHaveBeenCalled();
    expect(res.write).toHaveBeenCalled();
    expect(mockService.subscribe).toHaveBeenCalledWith(res);
  });
});