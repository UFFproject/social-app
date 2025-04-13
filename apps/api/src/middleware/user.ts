import { Context, Next } from 'hono';
import { getSignedCookie } from 'hono/dist/types/helper/cookie';
import { decodeAuthToken } from '@uff/auth';
import { fetchUserById } from '@/uff-db';

export async function loggedUserMiddleware(c: Context, next: Next) {
  // FIXME change process.env.COOKIE_SECRET to something more reliable
  const token = await getSignedCookie(
    c,
    'token',
    process.env.COOKIE_SECRET as string
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
}
