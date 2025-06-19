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

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:8080](http://localhost:8080).

---

## How to Test

This project uses [Vitest](https://vitest.dev/) and [React Testing Library](https://testing-library.com/).

To run all tests:
```sh
npm run test
```

Test files are located in `src/tests/`.

---

## How to Build

To create a production build:
```sh
npm run build
```
The output will be in the `dist/` directory.

---

## How to Build and Run with Docker

1. **Build the Docker image:**
   ```sh
   docker build -t tictactoe-app .
   ```

2. **Run the Docker container:**
   ```sh
   docker run -p 8080:8080 tictactoe-app
   ```

3. **Access the app:**  
   Open [http://localhost:8080](http://localhost:8080) in your browser.

**Note:**  
The Docker container uses `npm run preview` to serve the production build on port 8080.

---

## Project Structure

```
tictactoe-app/
├── src/
│   ├── components/         # React components
│   ├── tests/              # Unit tests
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── Dockerfile
├── package.json
├── vite.config.ts
├── vitest.config.ts
└── ...
```

---
