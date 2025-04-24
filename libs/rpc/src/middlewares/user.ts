import { decodeAuthToken } from '@uff/auth';
import { fetchUserById } from '@uff/db';
import { getSignedCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';

export const loggedUserMiddleware = createMiddleware(async (c, next) => {
  const token = await getSignedCookie(
    c,
    process.env.COOKIE_SECRET as string,
    'token'
  );

  if (token) {
    const payload = await decodeAuthToken(token);

    if (payload) {
      const userId = payload.userId;
      const user = await fetchUserById(userId);

      if (user) {
        c.set('user', user);
      }
    }
  }

  await next();
});
