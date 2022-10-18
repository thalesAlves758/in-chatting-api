import { User } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import {
  notFoundError,
  unauthorizedError,
} from '../exceptions/http.exceptions';
import { getUserByToken } from '../services/auth.services';

async function validateToken(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.replace('Bearer ', '');

  if (!token) {
    throw unauthorizedError(`A token is required`);
  }

  const user: Partial<User | null> = await getUserByToken(token);

  if (!user) {
    throw notFoundError(`Unable to find specified user`);
  }

  delete user.password;

  res.locals = { user };

  next();
}

export default validateToken;
