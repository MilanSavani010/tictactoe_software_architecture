export type Player = 'X' | 'O' ;

export type Board = (Player | null)[]

export interface GameState {
  board: Board;
  currentPlayer: Player;
  playerNames: { X: string; O: string };
  playerTokens: { [sessionId: string]: Player }; // Maps sessionId to assigned player
}