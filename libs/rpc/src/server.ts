import { Hono } from 'hono';
import { loggedUserMiddleware } from './middlewares/user';
import { authRouter } from './routes/auth';
import { profileRouter } from './routes/profile';
import { postRouter } from './routes/post';

declare module 'hono' {
  interface ContextVariableMap {
    user: {
      id: string;
    } | null;
  }
}

export const router = new Hono()
  .use(loggedUserMiddleware)
  .route('/auth', authRouter)
  .route('/post', postRouter)
  .route('/profile', profileRouter);

export type AppRouter = typeof router;
