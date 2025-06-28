import type { GameState, Player } from '../types/types';

const API_URL = `http://${window.location.hostname}:3001/s231063`;

export const api = {
  async fetchGameState(): Promise<GameState> {
    const res = await fetch(`${API_URL}/state`);
    return res.json();
  },

  async makeMove(player: Player, cell: number): Promise<GameState> {
    const res = await fetch(`${API_URL}/move`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player, cell }),
    });
    const data = await res.json();
    return data.state;
  },

  async assignPlayer(sessionId: string, requested: Player): Promise<Player | null> {
    const res = await fetch(`${API_URL}/assign-player`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, requested }),
    });
    const data = await res.json();
    return data.assigned;
  },

  async setPlayerName(player: Player, name: string): Promise<void> {
    await fetch(`${API_URL}/set-name`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player, name }),
    });
  },

  subscribeToGameState(onUpdate: (state: GameState) => void) {
    const eventSource = new EventSource(`${API_URL}/events`);
    eventSource.onmessage = (event) => {
      onUpdate(JSON.parse(event.data));
    };
    return () => eventSource.close();
  },

  async resetGame(){
    await fetch(`${API_URL}/reset`, { method: 'POST' });
  },
};