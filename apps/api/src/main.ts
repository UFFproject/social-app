import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { router } from '@uff/rpc/server';
import { cors } from 'hono/cors';

const app = new Hono();

app.use(
  cors({
    origin: 'http://localhost:4000',
    credentials: true,
  })
);

app.get('/', (c) => c.text('Hello from Hono!'));

app.route('', router);

serve({ fetch: app.fetch, port: 3000 }).on('listening', () =>
  console.log('>>> API running on http://localhost:3000/')
);
