import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import auth from './auth';

const app = new Hono();

app.get('/', (c) => c.text('Hello from Hono!'));

app.route('/auth', auth);

serve({ fetch: app.fetch, port: 3000 }).on('listening', () =>
  console.log('>>> API running on http://localhost:3000/')
);
