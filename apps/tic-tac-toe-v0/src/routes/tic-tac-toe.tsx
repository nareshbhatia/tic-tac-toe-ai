import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

type Cell = string | null;
type Board = Cell[];

export function TicTacToe() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState<string | null>(null);

  // @ts-ignore
  const handleClick = (index) => {
    if (board[index] === null && winner === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
      if (currentPlayer === 'X') {
        makeComputerMove(newBoard);
      }
      checkWinner(newBoard);
    }
  };

  const makeComputerMove = (board: Board) => {
    let bestMove = -1;
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'O';
        const score = minimax(newBoard, false);
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    if (bestMove !== -1) {
      const newBoard = [...board];
      newBoard[bestMove] = 'O';
      setBoard(newBoard);
      setCurrentPlayer('X');
      checkWinner(newBoard);
    }
  };

  const minimax = (board: Board, isMaximizing: boolean) => {
    const winner = checkWinnerHelper(board);
    if (winner !== null) {
      if (winner === 'O') return 1;
      if (winner === 'X') return -1;
      if (winner === 'tie') return 0;
    }
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board];
          newBoard[i] = 'O';
          const score = minimax(newBoard, false);
          bestScore = Math.max(bestScore, score);
        }
      }
      return bestScore;
    }
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        const newBoard = [...board];
        newBoard[i] = 'X';
        const score = minimax(newBoard, true);
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  };

  const checkWinnerHelper = (board: Board) => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (board.every((cell) => cell !== null)) {
      return 'tie';
    }
    return null;
  };

  const checkWinner = (board: Board) => {
    const winner = checkWinnerHelper(board);
    setWinner(winner);
  };

  // @ts-ignore
  const renderCell = (index) => (
    <div
      className="border-muted-foreground hover:bg-muted flex size-16 cursor-pointer items-center justify-center border bg-background text-4xl font-bold"
      onClick={() => {
        handleClick(index);
      }}
    >
      {board[index]}
    </div>
  );

  const renderResult = () => {
    if (winner === 'X') {
      return (
        <div className="text-primary text-2xl font-bold">Player X wins!</div>
      );
    } else if (winner === 'O') {
      return (
        <div className="text-primary text-2xl font-bold">Player O wins!</div>
      );
    } else if (winner === 'tie') {
      return <div className="text-primary text-2xl font-bold">It's a tie!</div>;
    }
  };

  useEffect(() => {
    if (winner !== null) {
      return;
    }
    const computerWon = checkWinnerHelper(board) === 'O';
    if (computerWon) {
      setWinner('O');
    }
  }, [board, winner]);

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background">
      <h1 className="mb-4 text-3xl font-bold">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((_, index) => renderCell(index))}
      </div>
      {winner ? (
        <div className="mt-4 flex flex-col items-center">
          <div>{renderResult()}</div>
          <Button
            className="mt-4"
            onClick={() => {
              setBoard(Array(9).fill(null));
              setCurrentPlayer('X');
              setWinner(null);
            }}
          >
            Play Again
          </Button>
        </div>
      ) : null}
    </div>
  );
}
