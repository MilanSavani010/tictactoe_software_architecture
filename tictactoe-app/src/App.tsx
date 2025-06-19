import { useEffect } from 'react';
import { TicTacToeBoard } from './components/TicTacToeBoard';
import { PlayerSelector } from './components/PlayerSelector';
import { NameInput } from './components/nameInput';
import { useBoard, useCurrentPlayer, usePlayerNames, usePlayerTokens, usePlayer, useName, useGameActions } from './store/gameStore';
import { useGameEffects } from './store/gameEffects';
import { useEventHandlers } from './store/gameHandlers';
import { api } from './services/api';

export default function App() {
  useGameEffects();

  // Zustand state selectors
  const board = useBoard();
  const currentPlayer = useCurrentPlayer();
  const playerNames = usePlayerNames();
  const playerTokens = usePlayerTokens();
  const player = usePlayer();
  const name = useName();

  // Zustand actions
  const { setName } = useGameActions();

  // Handlers
  const { onPlayerSelect, onCellClick } = useEventHandlers();

  // Assigned players for disabling buttons
  const assigned = {
    X: Object.values(playerTokens).includes('X'),
    O: Object.values(playerTokens).includes('O')
  };

  // Name input handler
  const handleNameSubmit = async (inputName: string) => {
    setName(inputName);
    if (player) {
      await api.setPlayerName(player, inputName);
    }
  };

  useEffect(() => {
    // (e.g., call api.setPlayerName if name or player changes)
  }, [name, player]);

  return (
    <main className="centered-container">
      <h1>TicTacToe</h1>
      {!name ? (
        <NameInput onSubmit={handleNameSubmit} defaultValue={name} />
      ) : (
        <>
          <PlayerSelector
            onSelect={(role) => onPlayerSelect(role)}
            selected={player}
            assigned={assigned}
          />
          <div style={{ marginBottom: 16 }}>
            {player
              ? currentPlayer === player
                ? "Your turn"
                : `${playerNames[currentPlayer] || currentPlayer}'s turn`
              : "Please select your player."}
          </div>
          <TicTacToeBoard
            board={board}
            onCellClick={(index) => onCellClick(index)}
            disabled={!player || currentPlayer !== player}
          />
        </>
      )}
    </main>
  );
}