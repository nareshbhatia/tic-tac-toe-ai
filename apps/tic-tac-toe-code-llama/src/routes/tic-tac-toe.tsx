import { useState } from 'react';
import { Board } from '@/components/Board';

function getWinner(squares: Array<string>) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getRandomSquare(squares: Array<string>) {
  const emptySquares = [];
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      emptySquares.push(i);
    }
  }

  const randIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randIndex];
}

function checkTie(squares: Array<string>) {
  for (let i = 0; i < squares.length; i++) {
    if (!squares[i]) {
      return false;
    }
  }
  return true;
}

export function TicTacToe() {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(''));
  const winner = getWinner(squares);
  const tie = !winner && checkTie(squares);

  const resetGame = () => {
    setSquares(Array(9).fill(''));
  };

  const handleClick = (square: number) => {
    const squaresCopy = [...squares];
    squaresCopy[square] = 'X';

    // if game is not over, make computer mover
    if (!getWinner(squaresCopy) && !checkTie(squaresCopy)) {
      const computerSquare = getRandomSquare(squaresCopy);
      squaresCopy[computerSquare] = 'O';
    }

    // update game state
    setSquares(squaresCopy);
  };

  return (
    <div className="flex flex-col items-center">
      <header className="h-20 flex items-center">
        <h1 className="text-xl font-semibold">Tic-Tac-Toe</h1>
      </header>
      <Board squares={squares} onClick={handleClick} />

      {winner && (
        <div className="flex flex-col gap-4 items-center py-10">
          {winner} wins!
          <button className="border px-4 py-2" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}

      {tie && (
        <div className="flex flex-col gap-4 items-center py-10">
          It's a tie!
          <button className="border px-4 py-2" onClick={resetGame}>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}
