import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  // @ts-ignore
  const checkWinner = (squares) => {
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
  const handleClick = (index) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);
  };

  // @ts-ignore
  const minimax = (board, depth, isMaximizing) => {
    const winner = checkWinner(board);
    if (winner === 'O') return 10 - depth;
    if (winner === 'X') return depth - 10;
    if (board.every((square: string | null) => square !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const computerMove = () => {
    let bestScore = -Infinity;
    let bestMove;
    const newBoard = [...board];

    for (let i = 0; i < 9; i++) {
      if (newBoard[i] === null) {
        newBoard[i] = 'O';
        const score = minimax(newBoard, 0, false);
        newBoard[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    // @ts-ignore
    newBoard[bestMove] = 'O';
    setBoard(newBoard);
    setIsPlayerTurn(true);
  };

  useEffect(() => {
    const newWinner = checkWinner(board);
    if (newWinner) {
      setWinner(newWinner);
    } else if (!isPlayerTurn && !winner) {
      const timer = setTimeout(computerMove, 500);
      return () => clearTimeout(timer);
    }
  }, [board, isPlayerTurn]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setWinner(null);
  };

  // @ts-ignore
  const renderSquare = (index) => (
    <Button
      className="w-20 h-20 text-4xl font-bold"
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </Button>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => renderSquare(index))}
      </div>
      {winner ? (
        <div className="text-2xl font-bold mb-4">
          {winner === 'X' ? 'You win!' : 'AI wins!'}
        </div>
      ) : board.every((square) => square !== null) ? (
        <div className="text-2xl font-bold mb-4">It's a draw!</div>
      ) : (
        <div className="text-2xl font-bold mb-4">
          {isPlayerTurn ? 'Your turn' : 'AI thinking...'}
        </div>
      )}
      <Button onClick={resetGame} className="mt-4">
        Reset Game
      </Button>
    </div>
  );
}

export default TicTacToe;
