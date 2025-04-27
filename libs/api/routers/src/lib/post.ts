import { createPost, getPosts } from '@/uff-db';
import { createPostSchema } from '@/uff-validators';
import { zValidator } from '@hono/zod-validator';

import { Hono } from 'hono';

export const postRouter = new Hono()
  .get('/', async (c) => {
    const posts = await getPosts();

    return c.json(posts, 200);
  })
  .post('/', zValidator('json', createPostSchema), async (c) => {
    const user = c.get('user');

    if (!user) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const post = await createPost({
      ...c.req.valid('json'),
      authorId: user.id,
      visibility: 'PUBLIC',
    });

    return c.json(post, 201);
  });
