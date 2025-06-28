# TicTacToe

TicTacToe repository for Software Architecture and Design Patterns exercises.

## Repository Owner


- Name: Milan Savani
- Student-ID (Matrikelnummer):2257738
- S-Number: s231063

## Collaborators

- Name: Ashish Ghaskata
- Student-ID (Matrikelnummer):2261151
- S-Number: s231073



## Structure of this repository

1. Code is placed in the root repository path.
1. Requirements, user documentation, ADRs, etc. are in markdown files in the `docs`-directory

### Links to all documentation files

*Add Links to the documentation files here*





# TicTacToe App

A simple TicTacToe game built with React, TypeScript, Vite, and Vitest.

---

## Project Setup

This project was bootstrapped using [Vite](https://vitejs.dev/) with the React + TypeScript template.

**Key technologies:**
- React 19
- TypeScript
- Vite
- Vitest & React Testing Library (for unit testing)
- Docker (for containerization)

---

## How to Run Locally

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the frontend development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080).

3. **Start the backend development server:**
   ```sh
   npm run server
   ```
   The app will be available at [http://localhost:3001](http://localhost:3001).
---

## How to Test

To run frontend tests:
```sh
npm run testfrontend
```
To run backend tests:
```sh
npm run testbackend
```


---

## How to Build

To create a frontend production build:
```sh
npm run build
```
To create a backend and frontend as a whole package
```sh
npm run postbuild
```

---

## How to Build and Run with Docker

1. **Build the Docker image:**
   ```sh
   docker build -t tictactoe-2257738 .
   ```

2. **Run the Docker container:**
   ```sh
   docker run -p 3001:3001 tictactoe-2257738
   ```

3. **Access the app:**  
   Open [http://localhost:3001](http://localhost:3001) in your browser.



## Frontend (`src/`) Architecture
```
┌────────────────────────────────────────────────────────────┐
│                        UI Layer                            │
│   App.tsx, components/ (PlayerSelector, TicTacToeBoard,    │
│   NameInput, etc.)                                         │
└───────────────▲────────────────────────────────────────────┘
                │
┌───────────────┴────────────────────────────────────────────┐
│                  State Management Layer                    │
│   store/gameStore.ts (Zustand store & hooks)               │
│   store/gameHandlers.ts (UI event handlers)                │
│   store/gameEffects.ts (side effects, SSE subscription)    │
└───────────────▲────────────────────────────────────────────┘
                │
┌───────────────┴────────────────────────────────────────────┐
│                    API Layer                               │
│   services/api.ts (all backend communication)              │
└────────────────────────────────────────────────────────────┘
```

## Backend (`server/`) Architecture
```

┌────────────────────────────────────────────────────────────┐
│                        API Layer                           │
│                (Express Controllers)                       │
│   server/api/gameController.cjs                            │
└───────────────▲────────────────────────────────────────────┘
                │
┌───────────────┴────────────────────────────────────────────┐
│                  Application Layer                         │
│             (Orchestrates Use Cases)                       │
│   server/application/GameService.cjs                       │
└───────────────▲────────────────────────────────────────────┘
                │
┌───────────────┴────────────────────────────────────────────┐
│                      Data Layer                            │
│         (Persistence, Listeners, State Storage)            │
│   server/data/GameRepository.cjs                           │
└───────────────▲────────────────────────────────────────────┘
                │
┌───────────────┴────────────────────────────────────────────┐
│                    Domain Layer                            │
│         (Business Logic, Entities, Rules)                  │
│   server/domain/Game.cjs                                   │
└────────────────────────────────────────────────────────────┘
```

---

