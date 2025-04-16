import { Hono } from 'hono';

// === Routers ===
import { userRouter } from './user/router';

export const mainRouter = new Hono()
  .basePath('/api/v1')
  .get('/test', (c) => c.json({ message: 'ok' }, 200))
  .route('/user', userRouter)

export type AppType = typeof mainRouter;
