import { useEffect } from 'react';
import { TicTacToeBoard } from './components/TicTacToeBoard';
import { PlayerSelector } from './components/PlayerSelector';
import { NameInput } from './components/nameInput';
import { useBoard, useCurrentPlayer, usePlayerNames, usePlayerTokens, usePlayer, useName } from './store/gameStore';
import { useGameEffects } from './store/gameEffects';
import { useGameHandlers } from './store/gameHandlers';

export default function App() {
  useGameEffects();

  // Zustand state selectors
  const board = useBoard();
  const currentPlayer = useCurrentPlayer();
  const playerNames = usePlayerNames();
  const playerTokens = usePlayerTokens();
  const player = usePlayer();
  const name = useName();

  // Handlers
  const { onPlayerSelect, onCellClick, onResetGame, onNameSubmit } = useGameHandlers();

  // Assigned players for disabling buttons
  const assigned = {
    X: Object.values(playerTokens).includes('X'),
    O: Object.values(playerTokens).includes('O')
  };

  

  useEffect(() => {
  }, [name, player]);

  return (
    <main className="centered-container">
      <h1>TicTacToe</h1>
      <button onClick={onResetGame} style={{ marginBottom: 16 }}>
        Reset Game
      </button>
      {!name ? (
        <NameInput onSubmit={onNameSubmit} defaultValue={name} />
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