import { Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { User } from '@prisma/client';
import { updateProfile } from '@/uff-db';
import { profileSchema } from './schema';

export const profile = new Hono();

profile.put(
  '/',
  zValidator('form', profileSchema, async (results, c: Context) => {
    const user: User | undefined = c.get('user');
    if (!user) return c.json({ success: false, error: 'Unauthorized' }, 400);

    if (!results.success)
      return c.json({ success: false, error: 'Invalid data' }, 400);

    const update = await updateProfile(user.id, results.data);
    if (!update)
      return c.json(
        { success: false, error: 'Profile could not be updated' },
        400
      );

    return c.json({ success: true, profile: update }, 200);
  })
);
