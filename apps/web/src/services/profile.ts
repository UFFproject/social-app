import { client } from '@/uff-api-client';
import { EditProfileValues } from '@/uff-validators';

export async function getProfile() {
  const res = await client.api.v1.profile.$get();
  const data = await res.json();

  if ('error' in data) {
    throw new Error(data.error);
  }

  return data;
}

export async function editProfile(values: EditProfileValues) {
  const res = await client.api.v1.profile.$put({
    json: values,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return await res.json();
}
