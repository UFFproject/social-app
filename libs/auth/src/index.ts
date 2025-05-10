import * as bcryptjs from 'bcryptjs';
import { sign, verify } from 'hono/jwt';
import { User } from '@prisma/client';
import {
  JWTPayload,
  JwtTokenExpired,
  JwtTokenInvalid,
} from 'hono/utils/jwt/types';

export interface JwtAuthTokenPayload extends JWTPayload {
  userId: string;
}

export async function verifyUserPassword(
  password: string,
  hashedPassword: string
) {
  return bcryptjs.compare(password, hashedPassword);
}

export async function hashPassword(password: string) {
  return bcryptjs.hash(password, 12);
}

export async function createAuthToken(user: User, rememberMe: boolean) {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) return null;

  if (!user || !user.id) return null;

  console.log("rememberMe:", rememberMe);

  const expInSeconds = rememberMe ? 30 * 24 * 60 * 60 : 60 * 60; // 30 days or 1 hour

  return sign(
    {
      userId: user.id,
      exp: Math.floor(Date.now() / 1000) + expInSeconds,
    },
    secret
  );
}

export async function decodeAuthToken(token: string) {
  const secret = process.env.JWT_ACCESS_SECRET;

  if (!secret) return false;

  let payload: JwtAuthTokenPayload;

  try {
    payload = <JwtAuthTokenPayload>await verify(token, secret);
  } catch (e) {
    if (e instanceof JwtTokenExpired || e instanceof JwtTokenInvalid) {
      console.error('Token expired or invalid:', e);
      console.log('Token:', );
      return false;
    }
    // FIXME: Add logging
    console.error('Uknown error during a decoding token:', e);
    return false;
  }

  if (!payload.userId) return false;

  return payload;
}
