import {
  activateAccount,
  createUser,
  fetchUserByEmail,
  getProfile,
} from '@/uff-db';
import { signInSchema, signUpSchema } from '@/uff-validators';
import { zValidator } from '@hono/zod-validator';
import { createAuthToken, hashPassword, verifyUserPassword } from '@/uff-auth';
import { Hono } from 'hono';
import { deleteCookie, setSignedCookie } from 'hono/cookie';

export const authRouter = new Hono()
  .post('/login', zValidator('json', signInSchema), async (c) => {
    if (c.get('user')) {
      return c.json({ error: 'Bad request' }, 400);
    }

    const { email, password, remember } = c.req.valid('json');

    const user = await fetchUserByEmail(email);

    if (!user) {
      return c.json(
        {
          error: 'Invalid credentials',
        },
        403
      );
    }

    const isPasswordValid = await verifyUserPassword(password, user.password);

    if (!isPasswordValid) {
      return c.json(
        {
          error: 'Invalid credentials',
        },
        403
      );
    }

    const token = await createAuthToken(user);

    if (!token) {
      return c.json(
        {
          error: 'Internal server error',
        },
        500
      );
    }


    await setSignedCookie(
      c,
      'token',
      token,
      process.env.COOKIE_SECRET as string,
      {
        httpOnly: true,
        sameSite: 'Lax',
        secure: true,
        maxAge: remember ? 60 * 60 * 24 * 30 : undefined, // 30 days
      }
    );

    return c.json({ success: true, token: token }, 200);
  })
  .post('/signup', zValidator('json', signUpSchema), async (c) => {
    if (c.get('user')) {
      return c.json({ error: 'Bad request' }, 400);
    }

    const { forename, surname, email, password } = c.req.valid('json');

    const existingUser = await fetchUserByEmail(email);

    if (existingUser) {
      return c.json({ error: 'User with this email already exists' }, 409);
    }

    const hashedPassword = await hashPassword(password);

    const user = await createUser({
      forename,
      surname,
      email,
      hashedPassword,
    });

    return c.json(user, 200);
  })
  .post('/logout', async (c) => {
    if (!c.get('user')) {
      return c.json({ error: 'Bad request' }, 400);
    }

    deleteCookie(c, 'token');

    return c.json({ success: true }, 200);
  })
  .get('/verify/:userId', async (c) => {
    const userId = c.req.param('userId');

    await activateAccount(userId);

    return c.json({ success: true }, 200);
  })
  .get('/me', async (c) => {
    const user = c.get('user');

    if (!user) {
      return c.json(null);
    }

    const profile = await getProfile(user.id);

    return c.json(profile, 200);
  })
  .post('/refresh', async (c) => {
    const user = c.get('user');

    if (!user) {
      return c.json(
        { success: false, error: 'Token expired or user not logged in' },
        400
      );
    }

    const token = await createAuthToken(user);

    if (!token)
      return c.json(
        { success: false, error: 'Token could not be refreshed' },
        400
      );

    await setSignedCookie(
      c,
      'token',
      token,
      process.env.COOKIE_SECRET as string
    );

    return c.json({ success: true, token: token });
  });
