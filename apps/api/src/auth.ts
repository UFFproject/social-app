import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const auth = new Hono();

auth.post('/login', async c => {
  const post = await c.req.parseBody();
  const email = post.email;
  const password = post.password;

  if (typeof email !== 'string' || typeof password !== 'string')
    return c.text('Invalid data');

  const user = await prisma.user.findUnique({where: {email: email}});
  if (!user)
    return c.text('User not found');

  const isPassValid = await bcrypt.compare(password, user.password);
  if (!isPassValid)
    return c.text('Invalid password');

  if (!user.isActive)
    return c.text('Account not active');

  // TODO - create session for user
  return c.text('Ok');
});

auth.post('/signup', async c => {
  const post = await c.req.parseBody();
  const email = post.email;
  const password = post.password;

  if (typeof email !== 'string' || typeof password !== 'string')
    return c.text('Invalid data');

  const existingUser = await prisma.user.findUnique({where: {email: email}});
  if (existingUser)
    return c.text('This email is already in use');

  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i))
    return c.text('Invalid email');

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      email: email,
      password: hashedPassword,
      isActive: false
    }
  });

  // TODO - verification email
  return c.text(`Successfully registered with user id ${user.id}`);
});

auth.get('/logout', async c => {
  // TODO - clear session
  return c.text('Ok');
});

auth.get('/verify/:userId', async c => {
  const userId = c.req.param('userId');
  if (!userId)
    return c.text('Invalid userId');

  const user = await prisma.user.findUnique({where: {id: userId}});
  if (!user)
    return c.text('User not found');

  if (user.isActive)
    return c.text('Account already activated');

  user.isActive = true;

  // TODO - redirect to login page
  return c.text('Ok');
});

export default auth;
