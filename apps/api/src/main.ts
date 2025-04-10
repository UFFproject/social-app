import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { auth } from './auth';
import { profile } from './profile';
import { loggedUserMiddleware } from './middleware/user';

const app = new Hono();

app.use(loggedUserMiddleware);

app.get('/', (c) => c.text('Hello from Hono!'));

app.route('/auth', auth);
app.route('/profile', profile);

serve({ fetch: app.fetch, port: 3000 }).on('listening', () =>
  console.log('>>> API running on http://localhost:3000/')
);
