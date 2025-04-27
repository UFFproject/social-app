import { client } from '@uff/rpc/client';
import { EditProfileValues } from '@uff/validators';

export async function getProfile() {
  const res = await client.profile.$get();
  const data = await res.json();

  if ('error' in data) {
    throw new Error(data.error);
  }

  return data;
}

export async function editProfile(values: EditProfileValues) {
  const res = await client.profile.update.$put({
    json: values,
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error);
  }

  return await res.json();
}
