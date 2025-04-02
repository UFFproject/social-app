import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { login, logout, signup, verifyAccount } from './auth';


const app = new Hono();

app.get('/', (c) => c.text('Hello from Hono!'));

/* Authentication */
app.post('/login', login);
app.post('/signup', signup);
app.get('/logout', logout);
app.get('/verify/:userId', verifyAccount);

serve({ fetch: app.fetch, port: 3000 }).on('listening', () =>
  console.log('>>> API running on http://localhost:3000/')
);
