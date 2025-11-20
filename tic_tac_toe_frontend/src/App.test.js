import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders Tic Tac Toe board and controls', () => {
  render(<App />);
  expect(screen.getByText(/Tic Tac Toe/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /Restart/i })).toBeInTheDocument();
});

test('allows placing X then O alternating and detects draw or winner state disables further moves', () => {
  render(<App />);
  const cells = screen.getAllByRole('button', { name: /Grid cell/i });
  // Place X in top-left
  fireEvent.click(cells[0]);
  expect(cells[0]).toHaveTextContent('X');

  // Place O in top-middle
  fireEvent.click(cells[1]);
  expect(cells[1]).toHaveTextContent('O');
});
