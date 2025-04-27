import { Hono } from 'hono';

import { userRouter } from './lib/user';
import { authRouter } from './lib/auth';
import { postRouter } from './lib/post';
import { profileRouter } from './lib/profile';
import { User } from '@prisma/client';

declare module 'hono' {
  interface ContextVariableMap {
    user: User | null;
  }
}

export const mainRouter = new Hono()
  .basePath('/api/v1')
  .get('/test', (c) => c.json({ message: 'ok' }, 200))
  .route('/auth', authRouter)
  .route('/user', userRouter)
  .route('/post', postRouter)
  .route('/profile', profileRouter);

export type AppType = typeof mainRouter;
