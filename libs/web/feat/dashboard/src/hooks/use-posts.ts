import { client } from '@/uff-api-client';
import { useQuery } from '@tanstack/react-query';

export async function getPosts() {
  const res = await client.api.v1.post.$get();

  return await res.json();
}

export type Post = Awaited<ReturnType<typeof getPosts>>[number];

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });
}
