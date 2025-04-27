import { useMutation } from '@tanstack/react-query';
import { EditProfileValues } from '@/uff-validators';
import { client } from '@/uff-api-client';

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

export function useEditProfile() {
  return useMutation({
    mutationFn: editProfile,
  });
}
