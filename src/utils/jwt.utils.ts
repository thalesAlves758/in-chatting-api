import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export function generateToken<T extends string | object | Buffer>(
  payload: T
): string {
  return jwt.sign(payload, process.env.JWT_SECRET ?? '', {
    expiresIn: 24 * 60 * 60 * 1000, /* eslint-disable-line */
  });
}

export function validateToken<T extends string | object | Buffer>(
  token: string
): T | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET ?? '') as T;
  } catch (error) {
    return null;
  }
}
