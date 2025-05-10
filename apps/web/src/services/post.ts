import { client } from '@/uff-api-client';
import { CreatePostValues } from '@/uff-validators';

export async function createPost(values: CreatePostValues) {
  const res = await client.api.v1.post.$post({
    json: values,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return await res.json();
}

export async function getPosts() {
  const res = await client.api.v1.post.$get();

  return await res.json();
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];
