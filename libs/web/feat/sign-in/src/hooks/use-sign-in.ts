import { useMutation } from '@tanstack/react-query';
import { SignInValues } from '@/uff-validators';
import { client } from '@/uff-api-client';

const signIn = async (values: SignInValues) => {
  const res = await client.api.v1.auth.login.$post({
    json: values,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
};

export function useSignIn() {
  return useMutation({
    mutationFn: signIn,
  });
}
