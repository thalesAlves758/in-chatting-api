import { Request, Response } from 'express';
import { registerUser } from '../services/auth.services';
import { SignUpBody } from '../types/auth.types';
import { HttpStatus } from '../types/http.types';

export async function signUp(req: Request, res: Response) {
  const { email, firstName, lastName, password, photoUrl }: SignUpBody =
    req.body;

  await registerUser({ email, firstName, lastName, password, photoUrl });

  res.sendStatus(HttpStatus.CREATED);
}
