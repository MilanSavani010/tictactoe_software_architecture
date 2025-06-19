# Technical Design – Design Patterns in TicTacToe

## Applied Patterns

- **Single Responsibility Principle (SRP) – SOLID**
  - [src/components/TicTacToeBoard.tsx](/tictactoe-app/src/components/TicTacToeBoard.tsx)
  - The `TicTacToeBoard` component is only responsible for rendering the TicTacToe grid, not handling player logic or state.

- **Single Responsibility Principle (SRP) – SOLID**
  - [src/components/PlayerSelector.tsx](/tictactoe-app/src/components/PlayerSelector.tsx)
  - The `PlayerSelector` component is only responsible for letting the user select a player, not rendering the board or managing the game.

- **Separation of Concerns – GRASP**
  - [src/App.tsx](/tictactoe-app/src/App.tsx)
  - The `App` component manages the main state and layout, delegating UI rendering and player selection to dedicated components.

- **Information Expert – GRASP**
  - [src/components/PlayerSelector.tsx](/tictactoe-app/src/components/PlayerSelector.tsx)
  - The `PlayerSelector` component manages and displays the selected player, as it has the necessary information for this responsibility.

---

**How the tests work:**  
Unit tests are written using [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).  
Each test renders a component in isolation, simulates user actions (like clicking), and asserts the expected UI or callback behavior.  
This ensures the UI and logic for these features work as intended before integration.