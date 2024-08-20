import { useState, useEffect } from 'react';

type Square = string | null;
type Board = Square[];

export function TicTacToe() {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('Next player: X');

  const calculateWinner = (squares: Board) => {
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // @ts-ignore
  const handleClick = (i) => {
    if (calculateWinner(board) || board[i]) return;
    const newBoard = board.slice();
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);
  };

  const minimax = (board: Board, depth: number, isMaximizing: boolean) => {
    const winner = calculateWinner(board);
    if (winner === 'X') return -10 + depth;
    if (winner === 'O') return 10 - depth;
    if (board.every((square) => square !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    }
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  };

  const bestMove = (board: Board) => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  const computerMove = () => {
    const move = bestMove(board);
    const newBoard = board.slice();
    // @ts-ignore
    newBoard[move] = 'O';
    setBoard(newBoard);
    setIsXNext(true);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (board.every((square) => square !== null)) {
      setStatus('Draw!');
    } else {
      setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    }

    if (!isXNext && !winner) {
      const timer = setTimeout(() => {
        computerMove();
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [board, isXNext]);

  // @ts-ignore
  const renderSquare = (i) => (
    <button
      className="size-20 border border-gray-300 bg-white text-4xl font-bold focus:outline-none"
      onClick={() => {
        handleClick(i);
      }}
    >
      {board[i]}
    </button>
  );

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="mb-4 text-4xl font-bold">Tic-Tac-Toe</h1>
      <div className="status mb-4 text-xl">{status}</div>
      <div className="board grid grid-cols-3 gap-1">
        {board.map((_, i) => renderSquare(i))}
      </div>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXNext(true);
          setStatus('Next player: X');
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
