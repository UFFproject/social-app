// import { cors } from 'hono/cors';
import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { testRouter } from '@uff/api-test';

const app = new Hono()
  .use(
    '*',
    // cors({ origin: [""], credentials: true })
  )

app.get('/test', (c) => {
  c.json({ message: 'Example API' });
});
app.route('/api', testRouter);

serve({ fetch: app.fetch, port: 3000 }).on('listening', () => {
  console.log(`>>> API running on ::${3000}`);
});
