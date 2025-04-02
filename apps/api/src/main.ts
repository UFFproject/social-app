import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { prisma } from '@/uff-db'

type Variables = {
  users: {
    id: string;
    email: string;
    password: string;
    isActive: boolean;
    createdAt: Date;
  }[];
};

const app = new Hono<{
  Variables: Variables;
}>();

app.get('/', (c) => c.text('Hello from Hono!'));

// app.use('/db/*', async (c, next) => {
//   const users = await prisma.user.findMany();
//   c.set('users', users);
//   await next();
// });

// app.get('/db/users', c =>
//   c.text(c.get('users').map(user => `id=${user.id} email=${user.email}`).join('\n')));

serve({ fetch: app.fetch, port: 3000 }).on('listening', () =>
  console.log('>>> API running on http://localhost:3000/')
);
