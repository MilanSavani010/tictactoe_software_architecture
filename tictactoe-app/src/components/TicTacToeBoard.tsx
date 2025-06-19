export function TicTacToeBoard() {
  return (
    <div className="ttt-board">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="ttt-cell"
          data-testid={`cell-${i}`}
        />
      ))}
    </div>
  );
}