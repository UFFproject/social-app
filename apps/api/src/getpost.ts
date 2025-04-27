import { Hono, Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { fetchPosts } from '@/uff-db';

export const postRoutes = new Hono();

const querySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).optional(),
  offset: z.coerce.number().int().min(0).optional(),
});

postRoutes.get('/posts', zValidator('query', querySchema, async (result, c: Context) => {
  if (!result.success) {
    return c.json({ success: false, error: result.error.format() }, 400);
  }

  const { limit = 10, offset = 0 } = result.data;

  const posts = await fetchPosts(limit, offset);

  return c.json({
    success: true,
    data: posts,
    pagination: { limit, offset }
  }, 200);
}));
