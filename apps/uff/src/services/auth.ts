import { client } from '@uff/rpc/client';
import { SignInValues, SignUpValues } from '@uff/validators';

export async function signUp(form: SignUpValues) {
  const res = await client.auth.signup.$post({
    form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text);
  }

  return await res.json();
}

export async function signIn(form: SignInValues) {
  const res = await client.auth.login.$post({
    form,
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
