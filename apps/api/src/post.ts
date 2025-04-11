import { Hono, Context } from 'hono';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';
import { createPost } from '@/uff-db';

export const postRoutes = new Hono();

// Zod schema for post creation
const postSchema = z.object({
  authorId: z.coerce.number().int(), // coerces string "1" → number 1
  communityId: z.string().min(1),
  visibility: z.enum(['PUBLIC', 'PRIVATE', 'COMMUNITY_ONLY']),
  textContent: z.string().max(5000).optional(),
  imagine: z.string().max(1000).optional(),
});


postRoutes.post('/post', zValidator('json', postSchema, async (result, c: Context) => {
  if (!result.success) {
    return c.json({ success: false, error: result.error.format() }, 400);
  }

  const { authorId, communityId, visibility, textContent, imagine } = result.data;

  const newPost = await createPost({
    authorId,
    communityId,
    visibility,
    textContent,
    imagine,
    createdAt: new Date().toISOString()
  });

  if (!newPost) {
    return c.json({ success: false, error: 'Post could not be created' }, 400);
  }

  return c.json(newPost, 201);
}));
