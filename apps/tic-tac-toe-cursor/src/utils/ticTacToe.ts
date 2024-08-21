export type Player = 'O' | 'X';
export type Square = Player | undefined;

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

export function checkWinner(squares: Square[]): Player | undefined {
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return undefined;
}

function minimax(
  board: Square[],
  depth: number,
  isMaximizing: boolean,
): number {
  const winner = checkWinner(board);
  if (winner === 'O') return 10 - depth;
  if (winner === 'X') return depth - 10;
  if (board.every((square) => square !== undefined)) return 0;

  const scores = board.map((square, index) => {
    if (square !== undefined) return isMaximizing ? -Infinity : Infinity;
    const newBoard = [...board];
    newBoard[index] = isMaximizing ? 'O' : 'X';
    return minimax(newBoard, depth + 1, !isMaximizing);
  });

  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

export function makeComputerMove(board: Square[]): Square[] {
  const moves = board.map((square, index) => {
    if (square !== undefined) return -Infinity;
    const newBoard = [...board];
    newBoard[index] = 'O';
    return minimax(newBoard, 0, false);
  });

  const bestMove = moves.indexOf(Math.max(...moves));
  const newBoard = [...board];
  newBoard[bestMove] = 'O';
  return newBoard;
}
