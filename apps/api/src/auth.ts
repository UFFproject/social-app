import { Context } from 'hono';
import { activateAccount, createUser, fetchUserByEmail } from '@/uff-db';
import { createAuthToken, hashPassword, verifyUserPassword } from '@uff/auth';
import { deleteCookie, setSignedCookie } from 'hono/cookie';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono';

export const auth = new Hono();

// POST actions schema
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  forename: z.string().min(1),
  surname: z.string().min(2)
});

auth.post('/login', zValidator('form', loginSchema, async (result, c: Context) => {
  if (!result.success)
    return c.json({success: false, error: 'Invalid data'}, 400);

  const {email, password} = result.data;

  const user = await fetchUserByEmail(email);
  if (!user)
    return c.json({success: false, error: 'Invalid email or password'}, 400);

  const isPasswordValid = await verifyUserPassword(password, user.password);
  if (!isPasswordValid)
    return c.json({success: false, error: 'Invalid email or password'}, 400);

  if (!user.isActive)
    return c.json({success: false, error: 'Account has not been activated'}, 400);

  const token = await createAuthToken(user);
  if (!token)
    return c.json({success: false, error: 'Server could not generate authentication token, try again later'}, 400);

  // FIXME change process.env.COOKIE_SECRET to something more reliable
  await setSignedCookie(c, 'token', token, process.env.COOKIE_SECRET as string);

  return c.json({success: true, token: token});
}));

auth.post('/signup', zValidator('form', signupSchema, async (result, c: Context) => {
  if (!result.success)
    return c.json({success: false, error: 'Invalid data'}, 400);

  const {forename, surname, email, password} = result.data;

  const userWithEmail = await fetchUserByEmail(email);
  if (userWithEmail)
    return c.json({success: false, error: 'User with this email already exists'}, 400);

  const hashedPassword = await hashPassword(password);
  const account = await createUser({
    forename,
    surname,
    email,
    hashedPassword
  });

  if (!account)
    return c.json({success: false, error: 'Account could not be created, try again later'}, 400);

  // TODO send verification email

  return c.json({success: true}, 200);
}));

auth.get('/logout', async (c: Context) => {
  deleteCookie(c, 'token');
  return c.json({success: true})
});

auth.get('/verify/:userId', async (c: Context) => {
  const userId = c.req.param('userId');
  const activated = await activateAccount(userId);
  if (!activated)
    return c.json({success: false, error: 'Account could not be activated'});

  return c.json({success: true});
});

