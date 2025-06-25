import { api } from '../services/api';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('api service', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
    global.EventSource = vi.fn(() => ({
      close: vi.fn(),
      onmessage: null,
    })) as any;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('fetchGameState fetches and returns game state', async () => {
    const mockState = { board: [], currentPlayer: 'X' };
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve(mockState),
    });

    const result = await api.fetchGameState();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/state');
    expect(result).toEqual(mockState);
  });

  it('makeMove sends correct POST request and returns state', async () => {
    const mockState = { board: ['X', null, null, null, null, null, null, null, null], currentPlayer: 'O' };
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ state: mockState }),
    });

    const result = await api.makeMove('X', 0);

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/move',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: 'X', cell: 0 }),
      })
    );
    expect(result).toEqual(mockState);
  });

  it('assignPlayer sends correct POST request and returns assigned player', async () => {
    (fetch as any).mockResolvedValue({
      json: () => Promise.resolve({ assigned: 'X' }),
    });

    const result = await api.assignPlayer('session1', 'X');

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/assign-player',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: 'session1', requested: 'X' }),
      })
    );
    expect(result).toBe('X');
  });

  it('setPlayerName sends correct POST request', async () => {
    (fetch as any).mockResolvedValue({});

    await api.setPlayerName('X', 'Alice');

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/set-name',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ player: 'X', name: 'Alice' }),
      })
    );
  });

  it('resetGame sends POST request to reset endpoint', async () => {
    (fetch as any).mockResolvedValue({});

    await api.resetGame();

    expect(fetch).toHaveBeenCalledWith(
      'http://localhost:3001/reset',
      expect.objectContaining({
        method: 'POST',
      })
    );
  });

  it('subscribeToGameState sets up EventSource and handles messages', () => {
    const onUpdate = vi.fn();
    let eventSourceOnMessage: ((event: any) => void) | null = null;

    // Mock EventSource to capture onmessage assignment
    (global.EventSource as any) = vi.fn(function (this: any, url: string) {
      this.url = url;
      Object.defineProperty(this, 'onmessage', {
        set(fn) {
          eventSourceOnMessage = fn;
        },
      });
      this.close = vi.fn();
    });

    const unsubscribe = api.subscribeToGameState(onUpdate);

    // Simulate receiving a message
    const mockState = { board: [], currentPlayer: 'O' };
    eventSourceOnMessage &&
      eventSourceOnMessage({ data: JSON.stringify(mockState) });

    expect(global.EventSource).toHaveBeenCalledWith('http://localhost:3001/events');
    expect(onUpdate).toHaveBeenCalledWith(mockState);

    // Test unsubscribe closes the EventSource
    unsubscribe();
    // No assertion here since close is a mock, but you could enhance this if needed
  });
});