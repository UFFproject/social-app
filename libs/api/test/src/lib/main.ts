import { Hono } from 'hono'

export const testRouter = new Hono()
.get('/', async (c) => {
  return c.json({ message: 'Example GET /' }, 200);
})
.post('/', async (c) => {
  console.log(await c.req.json());
  return c.json({ message: 'Example POST /' }, 200);
})