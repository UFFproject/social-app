import { Hono } from 'hono';

export const userRouter = new Hono()
.get('/me', (c) => {
  return c.json({
    message: 'Hello from the user router!'
  })
})