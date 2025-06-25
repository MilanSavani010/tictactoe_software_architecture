import { usePlayer, useCurrentPlayer, useBoard, useGameActions, useSessionId} from './gameStore';
import { api } from '../services/api';

export function useGameHandlers() {
  const player = usePlayer();
  const currentPlayer = useCurrentPlayer();
  const board = useBoard();
  const sessionId = useSessionId();
  const { setPlayer } = useGameActions();
  const { setName } = useGameActions();

  // Handler for selecting a player role
  const onPlayerSelect = async (role: 'X' | 'O') => {
    const assigned = await api.assignPlayer(sessionId, role);
    if (assigned) {
      setPlayer(assigned);
    } else {
      alert('Both players are already taken!');
    }
  };

  // Handler for clicking a cell
  const onCellClick = async (index: number) => {
    if (!player || currentPlayer !== player || board[index]) return;
    await api.makeMove(player, index);
  };

  const onResetGame = async () => {
    await api.resetGame();
  };

  // Handler for submitting player name
  const onNameSubmit = async (inputName: string) => {
    setName(inputName);
    if (player) {
      await api.setPlayerName(player, inputName);
    }
  };


  return { onPlayerSelect, onCellClick, onResetGame, onNameSubmit };
}