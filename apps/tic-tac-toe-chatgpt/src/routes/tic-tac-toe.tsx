import { useEffect, useState } from 'react';

type Square = string | null;

export function TicTacToe() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [status, setStatus] = useState('Next player: X');

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

  // @ts-ignore
  const calculateWinner = (squares) => {
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

  const minimax = (
    newBoard: Square[],
    depth: number,
    isMaximizing: boolean,
  ) => {
    const winner = calculateWinner(newBoard);
    if (winner === 'X') return -10 + depth;
    if (winner === 'O') return 10 - depth;
    if (!newBoard.includes(null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = 'O';
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (newBoard[i] === null) {
          newBoard[i] = 'X';
          const score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const bestMove = () => {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const newBoard = board.slice();
        newBoard[i] = 'O';
        const score = minimax(newBoard, 0, false);
        newBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    return move;
  };

  // @ts-ignore
  const handleClick = (index) => {
    const newBoard = board.slice();
    if (calculateWinner(board) || board[index]) return;

    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setStatus(`Winner: ${winner}`);
    } else if (!board.includes(null)) {
      setStatus('Draw');
    } else if (!isXNext) {
      const move = bestMove();
      const newBoard = board.slice();
      // @ts-ignore
      newBoard[move] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
    } else {
      setStatus(`Next player: ${isXNext ? 'X' : 'O'}`);
    }
  }, [isXNext, board]);

  // @ts-ignore
  const renderSquare = (index) => (
    <button
      className="size-16 border border-gray-400 text-2xl font-bold"
      onClick={() => {
        handleClick(index);
      }}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="text-3xl mb-4">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => {
          setBoard(Array(9).fill(null));
          setIsXNext(true);
          setStatus('Next player: X');
        }}
      >
        Restart
      </button>
    </div>
  );
}
