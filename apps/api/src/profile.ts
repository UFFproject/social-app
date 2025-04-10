import { Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono';
import { User } from '@prisma/client'
import { updateProfile } from '@/uff-db';

export const profile = new Hono();

const profileSchema = z.object({
  name: z.string().min(1).optional(),
  surname: z.string().min(2).optional(),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
  nationality: z.string().min(3).optional(),
  fieldOfStudy: z.string().min(3).optional(),
  yearOfStudy: z.number().min(1).max(5).optional(),
  languages: z.string().min(3).optional(),
  relationships: z.string().min(3).optional()
});

profile.put('/', zValidator('form', profileSchema, async (results, c : Context) => {
  const user : User | undefined = c.get('user');
  if (!user)
    return c.json({success: false, error: 'Unauthorized'}, 400);

  if (!results.success)
    return c.json({success: false, error: 'Invalid data'}, 400);

  const update = await updateProfile(user.id, results.data);
  if (!update)
    return c.json({success: false, error: 'Profile could not be updated'}, 400);

  return c.json({success: true, profile: update}, 200);
}));
