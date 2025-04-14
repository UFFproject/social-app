import { Hono } from 'hono';
import { authRouter } from './auth';

export const router = new Hono().route('/auth', authRouter);

export type AppRouter = typeof router;
