import { useEffect, useState } from 'react';

interface Move {
  index: number;
  score: number;
}

type Square = string | null;

export function TicTacToe() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

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

  // @ts-ignore
  const minimax = (newBoard: Square[], player) => {
    const availSpots = newBoard.filter((s) => s === null);

    const winner = calculateWinner(newBoard);
    if (winner === 'X') return { score: -10 };
    if (winner === 'O') return { score: 10 };
    if (availSpots.length === 0) return { score: 0 };

    const moves: Move[] = [];
    for (let i = 0; i < availSpots.length; i++) {
      const move = { index: 0, score: 0 };
      move.index = newBoard.indexOf(availSpots[i]);
      newBoard[move.index] = player;

      if (player === 'O') {
        const result = minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = minimax(newBoard, 'O');
        move.score = result.score;
      }

      newBoard[move.index] = null;
      moves.push(move);
    }

    let bestMove;
    if (player === 'O') {
      let bestScore = -10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      let bestScore = 10000;
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    // @ts-ignore
    return moves[bestMove];
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
    if (!isXNext) {
      const newBoard = board.slice();
      const bestMove = minimax(newBoard, 'O').index;
      newBoard[bestMove] = 'O';
      setBoard(newBoard);
      setIsXNext(true);
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

  const winner = calculateWinner(board);
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="mb-4 text-3xl">{status}</div>
      <div className="grid grid-cols-3 gap-1">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={() => {
          setBoard(Array(9).fill(null));
        }}
      >
        Restart
      </button>
    </div>
  );
}
