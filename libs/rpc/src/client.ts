import { hc } from 'hono/client';
import { AppRouter } from './server';

export const client = hc<AppRouter>('http://localhost:3000', {
  init: {
    credentials: 'include',
  },
});
