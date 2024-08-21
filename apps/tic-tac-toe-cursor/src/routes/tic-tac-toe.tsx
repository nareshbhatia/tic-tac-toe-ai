import { makeComputerMove, checkWinner } from '@/utils/ticTacToe';
import type { Square } from '@/utils/ticTacToe';
import { useState, useEffect } from 'react';

export function TicTacToe() {
  const [board, setBoard] = useState<Square[]>(Array(9).fill(undefined));
  const [isHumanTurn, setIsHumanTurn] = useState(true);

  useEffect(() => {
    if (!isHumanTurn) {
      const timer = setTimeout(() => {
        const newBoard = makeComputerMove(board);
        setBoard(newBoard);
        setIsHumanTurn(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
    return undefined;
  }, [isHumanTurn, board]);

  const handleClick = (index: number) => {
    if (board[index] || !isHumanTurn || checkWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsHumanTurn(false);
  };

  const renderSquare = (index: number) => (
    <button
      className="flex size-24 items-center justify-center border border-gray-400 text-4xl font-bold"
      key={index}
      onClick={() => {
        handleClick(index);
      }}
    >
      {board[index]}
    </button>
  );

  const winner = checkWinner(board);
  const isDraw = !winner && board.every((square) => square !== undefined);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="mb-4 text-3xl font-bold">Tic-Tac-Toe</h1>
      <div className="mb-4 grid grid-cols-3 gap-2">
        {board.map((_, index) => renderSquare(index))}
      </div>
      <div className="mb-4 text-xl font-semibold">
        {winner
          ? `Winner: ${winner}`
          : isDraw
            ? 'Draw!'
            : `Current player: ${isHumanTurn ? 'X (You)' : 'O (Computer)'}`}
      </div>
      <button
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        onClick={() => {
          setBoard(Array(9).fill(undefined));
          setIsHumanTurn(true);
        }}
      >
        Reset Game
      </button>
    </div>
  );
}
