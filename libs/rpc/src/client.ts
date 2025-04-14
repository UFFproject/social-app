import { hc } from 'hono/client';
import { AppRouter } from '.';

export const client = hc<AppRouter>('http://localhost:3000');
