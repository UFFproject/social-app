import * as bcryptjs from 'bcryptjs';
import { sign, verify } from 'hono/jwt';

export async function verifyUserPassword(password : string, hashedPassword: string) {
  return bcryptjs.compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 12);
}

export async function createAuthToken(user: any) {
  const secret = process.env['JWT_ACCESS_SECRET'];

  if (!secret)
    return null;

  if (!user || !user.id)
    return null;

  return sign({
    userId: user.id
  }, secret);
}

export async function decodeAuthToken(token: string) {
  const secret = process.env['JWT_ACCESS_SECRET'];

  if (!secret)
    return false;

  return verify(token, secret);
}

export function validateEmail(email: string) {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(email);
}
