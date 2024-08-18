import { RootLayout } from './routes/root';
import { TicTacToe } from './routes/tic-tac-toe';
import type { RouteObject } from 'react-router-dom';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <TicTacToe />,
      },
    ],
  },
];
