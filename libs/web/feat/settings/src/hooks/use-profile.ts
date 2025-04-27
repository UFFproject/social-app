import { useSuspenseQuery } from '@tanstack/react-query';
import { client } from '@/uff-api-client';

export async function getProfile() {
  const res = await client.api.v1.profile.$get();
  const data = await res.json();

  if ('error' in data) {
    throw new Error(data.error);
  }

  return data;
}

export function useProfile() {
  return useSuspenseQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
}
