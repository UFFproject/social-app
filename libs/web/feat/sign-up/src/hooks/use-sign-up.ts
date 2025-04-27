import { SignUpValues } from '@/uff-validators';
import { useMutation } from '@tanstack/react-query';
import { client } from '@/uff-api-client';

export async function signUp(values: SignUpValues) {
  const res = await client.api.v1.auth.signup.$post({
    json: values,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
}

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
  });
}
