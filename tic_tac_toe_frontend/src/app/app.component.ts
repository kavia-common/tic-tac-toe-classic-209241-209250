import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';

/**
 * PUBLIC_INTERFACE
 * AppComponent - Angular implementation of Tic Tac Toe game with:
 * - 3x3 grid
 * - alternating X/O turns
 * - win and draw detection
 * - status display and restart control
 * - modern light theme with #3b82f6 (primary) and #06b6d4 (accent)
 * Environment variables are available via imported `environment`.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="app-root" [attr.data-theme]="theme">
      <header class="ttt-wrapper">
        <div class="ttt-header">
          <h1 class="ttt-title">Tic Tac Toe</h1>
          <p class="ttt-status" [ngClass]="{'ttt-status--win': winner, 'ttt-status--draw': isDraw && !winner}">
            {{ statusText }}
          </p>
        </div>

        <div class="ttt-board" role="grid" aria-label="Tic Tac Toe board">
          <button
            *ngFor="let value of squares; let idx = index"
            class="ttt-square"
            [disabled]="gameOver || value !== null"
            [ngClass]="{ 'ttt-square--win': winningLine?.includes(idx) }"
            (click)="handleClick(idx)"
            [attr.aria-label]="'Grid cell ' + (value ?? 'empty')">
            {{ value }}
          </button>
        </div>

        <div class="ttt-controls">
          <button class="ttt-button ttt-button--primary" (click)="restartGame()" aria-label="Restart game">Restart</button>
          <button class="ttt-button ttt-button--ghost" (click)="toggleTheme()" [attr.aria-label]="'Switch to ' + (theme === 'light' ? 'dark' : 'light') + ' mode'">
            {{ theme === 'light' ? 'Dark Mode' : 'Light Mode' }}
          </button>
        </div>

        <footer class="ttt-footer">
          <span class="ttt-legend">X starts. Click an empty square to place your mark.</span>
        </footer>
      </header>
    </div>
  `
})
export class AppComponent {
  theme: 'light' | 'dark' = 'light';

  squares: (null | 'X' | 'O')[] = Array(9).fill(null);
  xIsNext = true;
  winningLine: number[] | null = null;

  // PUBLIC_INTERFACE
  get winner(): 'X' | 'O' | null {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ] as const;

    for (const [a, b, c] of lines) {
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.winningLine = [a, b, c];
        return this.squares[a];
      }
    }
    this.winningLine = null;
    return null;
  }

  // PUBLIC_INTERFACE
  get isDraw(): boolean {
    return this.squares.every(Boolean) && !this.winner;
  }

  // PUBLIC_INTERFACE
  get gameOver(): boolean {
    return Boolean(this.winner) || this.isDraw;
  }

  // PUBLIC_INTERFACE
  get statusText(): string {
    if (this.winner) return `Winner: ${this.winner}`;
    if (this.isDraw) return `It's a draw`;
    return `Next player: ${this.xIsNext ? 'X' : 'O'}`;
  }

  // PUBLIC_INTERFACE
  handleClick(index: number): void {
    if (this.gameOver || this.squares[index]) return;
    this.squares = this.squares.slice();
    this.squares[index] = this.xIsNext ? 'X' : 'O';
    this.xIsNext = !this.xIsNext;
  }

  // PUBLIC_INTERFACE
  restartGame(): void {
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winningLine = null;
  }

  // PUBLIC_INTERFACE
  toggleTheme(): void {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }

  // Example of reading env for debugging or future integrations
  // Not displayed but available to the app logic
  env = environment;
}
