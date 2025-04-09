import * as bcryptjs from 'bcryptjs';
import { sign, verify } from 'hono/jwt';
import {User} from '@prisma/client';



export async function verifyUserPassword(password : string, hashedPassword: string) {
  return bcryptjs.compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 12);
}

export async function createAuthToken(user: User) {
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
