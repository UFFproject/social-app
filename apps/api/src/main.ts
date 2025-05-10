import { serve } from '@hono/node-server';
import { Hono } from 'hono';

import { mainRouter } from '@/uff-api-routers';
import { cors } from 'hono/cors';
import { loggedUserMiddleware } from './middleware/user';

const app = new Hono();

app.use(
  "*",
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  })
);

app.use(loggedUserMiddleware);

app.route('/', mainRouter);

serve({ fetch: app.fetch, port: 3000 }).on('listening', () =>
  console.log('>>> API running on http://localhost:3000/')
);
