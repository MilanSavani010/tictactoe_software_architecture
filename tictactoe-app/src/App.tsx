import { useState } from 'react';
import { TicTacToeBoard } from './components/TicTacToeBoard';
import { PlayerSelector } from './components/PlayerSelector';

export default function App() {
  const [player, setPlayer] = useState<'X' | 'O' | null>(null);

  return (
    <main className="centered-container">
      <h1>TicTacToe</h1>
      <PlayerSelector onSelect={setPlayer} selected={player} />
      <TicTacToeBoard />
    </main>
  );
}