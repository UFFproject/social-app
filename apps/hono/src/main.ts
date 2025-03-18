import { serve } from '@hono/node-server';
import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => c.text('Hello from Hono!'));

serve({ fetch: app.fetch, port: 3000 }).on('listening', () =>
  console.log('>>> API running on http://localhost:3000/')
);
