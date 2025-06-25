import { create } from 'zustand';
import type { GameState, Player } from '../types/types';

function generateSessionId() {
  return Math.random().toString(36).slice(2);
}

interface GameStoreState extends GameState {
  player: Player | null;
  name: string;
  sessionId: string;
}

interface GameStoreActions {
  setGame: (game: GameState) => void;
  setPlayer: (player: Player | null) => void;
  setName: (name: string) => void;
  setSessionId: (sessionId: string) => void;
}

const useGameStoreBase =  create<GameStoreState & { actions: GameStoreActions }>((set) => ({
  // --- State ---
  board: Array(9).fill(null),
  currentPlayer: 'X',
  playerNames: { X: '', O: '' },
  playerTokens: {},
  sessionId: generateSessionId(), // Generate a unique session ID
  player: null,
  name: '',

   // --- Actions ---
  actions: {
    setGame: (game) =>
      set({
        board: game.board,
        currentPlayer: game.currentPlayer,
        playerNames: game.playerNames,
        playerTokens: game.playerTokens,
      }),
    setPlayer: (player) => set({ player }),
    setName: (name) => set({ name }),
    setSessionId: (sessionId) => set({ sessionId }),

  }
}));

// --- Custom hooks for each state/action ---
export const useBoard = () => useGameStoreBase((state) => state.board);
export const useCurrentPlayer = () => useGameStoreBase((state) => state.currentPlayer);
export const usePlayerNames = () => useGameStoreBase((state) => state.playerNames);
export const usePlayerTokens = () => useGameStoreBase((state) => state.playerTokens);
export const usePlayer = () => useGameStoreBase((state) => state.player);
export const useName = () => useGameStoreBase((state) => state.name);
export const useSessionId = () => useGameStoreBase((state) => state.sessionId);

export const useGameActions = () => useGameStoreBase((state) => state.actions);

// Optionally, export the base store for advanced usage
export { useGameStoreBase as useGameStore };