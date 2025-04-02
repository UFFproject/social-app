import { Context } from 'hono';
import { activateAccount, createUser, fetchUserByEmail } from '@/uff-db';
import { createAuthToken, hashPassword, validateEmail, verifyUserPassword } from '@uff/auth';
import { deleteCookie, setCookie } from 'hono/cookie';

export async function login(c: Context) {
  const body = await c.req.parseBody();
  const {email, password} = body;

  if (typeof email !== 'string' || typeof password !== 'string')
    return c.json({status: 'error', error: 'Invalid email or password'});

  const user = await fetchUserByEmail(email);
  if (!user)
    return c.json({status: 'error', error: 'Invalid email or password'});

  const isPasswordValid = await verifyUserPassword(password, user.password);
  if (!isPasswordValid)
    return c.json({status: 'error', error: 'Invalid email or password'});

  if (!user.isActive)
    return c.json({status: 'error', error: 'Account has not been activated'});

  const token = await createAuthToken(user);
  if (!token)
    return c.json({status: 'error', error: 'Server could not generate authentication token, try again later'});

  setCookie(c, 'token', token);

  return c.json({status: 'success'});
}

export async function logout(c: Context) {
  deleteCookie(c, 'token');
  return c.json({status: 'success'});
}

export async function signup(c: Context) {
  const body = await c.req.parseBody();
  const {forename, surname, email, password} = body;

  if (typeof forename !== 'string' || typeof surname !== 'string' || typeof email !== 'string' || typeof password !== 'string')
    return c.json({status: 'error', error: 'Invalid data'});

  if (forename.length < 3 || surname.length < 3)
    return c.json({status: 'error', error: 'Forename or surname too short'});

  if (!validateEmail(email))
    return c.json({status: 'error', error: 'Invalid email format'});

  // TODO - better password strength check
  if (password.length < 6)
    return c.json({status: 'error', error: 'Password too weak'});

  const userWithEmail = await fetchUserByEmail(email);
  if (userWithEmail)
    return c.json({status: 'error', error: 'User with this email already exists'});

  const hashedPassword = await hashPassword(password);
  const account = await createUser(forename, surname, email, hashedPassword);
  if (!account)
    return c.json({status: 'error', error: 'Account could not be created, try again later'});

  return c.json({status: 'success', user: account.user, profile: account.profile});
}

export async function verifyAccount(c: Context) {
  const userId = c.req.param('userId');
  const activated = await activateAccount(userId);
  if (!activated)
    return c.json({status: 'error', error: 'Account could not be activated'});

  return c.json({status: 'success'});
}
