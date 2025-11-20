import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

/**
 * Simple, responsive Tic Tac Toe game
 * - Centered layout with a 3x3 grid
 * - Alternates turns between X and O
 * - Detects wins and draws
 * - Disables further moves after game end
 * - Provides restart button
 * - Uses light theme accents:
 *   primary #3b82f6, success #06b6d4, secondary #64748b
 */

// Square component for individual cell
function Square({ value, onClick, disabled, highlight }) {
  return (
    <button
      className={`ttt-square ${highlight ? 'ttt-square--win' : ''}`}
      onClick={onClick}
      disabled={disabled || value !== null}
      aria-label={`Grid cell ${value ?? 'empty'}`}
    >
      {value}
    </button>
  );
}

// PUBLIC_INTERFACE
function App() {
  // Light theme only per requirements, but keep state to allow easy theming toggles later.
  const [theme, setTheme] = useState('light');

  // Board state: 9 cells initialized to null
  const [squares, setSquares] = useState(Array(9).fill(null));
  // Current player 'X' starts
  const [xIsNext, setXIsNext] = useState(true);
  // Track winning line indices to highlight
  const [winningLine, setWinningLine] = useState(null);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Calculate status: winner, draw, or next player
  const { winner, isDraw } = useMemo(() => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], isDraw: false, line: [a, b, c] };
      }
    }
    const draw = squares.every(Boolean);
    return { winner: null, isDraw: draw, line: null };
  }, [squares]);

  useEffect(() => {
    // set winning line to highlight if winner exists
    if (winner) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (const line of lines) {
        const [a, b, c] = line;
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          setWinningLine(line);
          return;
        }
      }
    } else {
      setWinningLine(null);
    }
  }, [winner, squares]);

  // PUBLIC_INTERFACE
  const handleClick = (index) => {
    /**
     * Places the current player's mark if the cell is empty and game not over.
     * Switches turns and updates board state.
     */
    if (winner || isDraw || squares[index]) return; // ignore when game over or cell filled
    const next = squares.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setSquares(next);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const restartGame = () => {
    /** Reset board and status to start a new game. */
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinningLine(null);
  };

  const gameOver = Boolean(winner) || isDraw;

  const statusText = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "It's a draw"
    : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="App">
      <header className="ttt-wrapper">
        <div className="ttt-header">
          <h1 className="ttt-title">Tic Tac Toe</h1>
          <p className={`ttt-status ${winner ? 'ttt-status--win' : isDraw ? 'ttt-status--draw' : ''}`}>
            {statusText}
          </p>
        </div>

        <div className="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          {squares.map((value, idx) => (
            <Square
              key={idx}
              value={value}
              onClick={() => handleClick(idx)}
              disabled={gameOver}
              highlight={winningLine ? winningLine.includes(idx) : false}
            />
          ))}
        </div>

        <div className="ttt-controls">
          <button
            className="ttt-button ttt-button--primary"
            onClick={restartGame}
            aria-label="Restart game"
          >
            Restart
          </button>
          <button
            className="ttt-button ttt-button--ghost"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>

        <footer className="ttt-footer">
          <span className="ttt-legend">
            X starts. Click an empty square to place your mark.
          </span>
        </footer>
      </header>
    </div>
  );
}

export default App;
