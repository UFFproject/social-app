import { CreatePostValues } from '@/uff-validators';
import { useMutation } from '@tanstack/react-query';
import { client } from '@/uff-api-client';

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

export function useCreatePost() {
  return useMutation({
    mutationFn: createPost,
  });
}
