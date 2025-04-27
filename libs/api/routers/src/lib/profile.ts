import { getProfile, updateProfile } from '@/uff-db';
import { editProfileSchema } from '@/uff-validators';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';

export const profileRouter = new Hono()
  .get('/', async (c) => {
    const user = c.get('user');

    if (!user) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        403
      );
    }

    const data = await getProfile(user.id);

    if (!data) {
      return c.json(
        {
          error: 'Not found',
        },
        404
      );
    }

    return c.json(data);
  })

  .put('/', zValidator('json', editProfileSchema), async (c) => {
    const user = c.get('user');

    if (!user) {
      return c.json(
        {
          error: 'Unauthorized',
        },
        403
      );
    }

    const data = await updateProfile(user.id, c.req.valid('json'));

    return c.json(data, 200);
  });
