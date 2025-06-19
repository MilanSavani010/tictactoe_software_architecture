import { useGameStore, useGameActions } from './gameStore';
import { api } from '../services/api';

function useActionHandlers() {
  const player = useGameStore((state) => state.player);
  const currentPlayer = useGameStore((state) => state.currentPlayer);
  const board = useGameStore((state) => state.board);
  const { setPlayer } = useGameActions();

  const assignPlayerRole = async (requested: 'X' | 'O') => {
    const sessionId = localStorage.getItem('sessionId')!;
    const assigned = await api.assignPlayer(sessionId, requested);
    if (assigned) {
      setPlayer(assigned);
      localStorage.setItem('player', assigned);
    } else {
      handleError('Both players are already taken!');
    }
  };

  const makeMove = async (index: number) => {
    if (!player || currentPlayer !== player || board[index]) return;
    await api.makeMove(player, index);
  };

  return { assignPlayerRole, makeMove };
}


function useEventHandlers() {
  const { assignPlayerRole, makeMove } = useActionHandlers();

  const onPlayerSelect = (role: 'X' | 'O') => {
    assignPlayerRole(role);
  };

  // UI event: player clicks a cell
  const onCellClick = (index: number) => {
    makeMove(index);
  };

  return { onPlayerSelect, onCellClick };
}

function useInputHandlers() {
  const validatePlayerName = (name: string) => {
    return typeof name === 'string' && name.trim().length > 0;
  };

  return { validatePlayerName };
}

function handleError(message: string) {
  alert(message);
}

export {
  useActionHandlers,
  useEventHandlers,
  useInputHandlers,
  handleError,
};