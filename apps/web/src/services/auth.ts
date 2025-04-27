import { client } from '@uff/rpc/client';
import { SignInValues, SignUpValues } from '@uff/validators';

export async function signUp(values: SignUpValues) {
  const res = await client.auth.signup.$post({
    json: values,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
}

export async function signIn(values: SignInValues) {
  const res = await client.auth.login.$post({
    json: values,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
}

export async function getSession() {
  const res = await client.auth.me.$get();
  return await res.json();
}

export async function signOut() {
  await client.auth.logout.$post();
}
