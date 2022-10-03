import { Request, Response } from 'express';
import { registerUser, signInUser } from '../services/auth.services';
import { SignInBody, SignUpBody } from '../types/auth.types';
import { HttpStatus } from '../types/http.types';

export async function signUp(req: Request, res: Response) {
  const { email, firstName, lastName, password, photoUrl }: SignUpBody =
    req.body;

  await registerUser({ email, firstName, lastName, password, photoUrl });

  res.sendStatus(HttpStatus.CREATED);
}

export async function signIn(req: Request, res: Response) {
  const data: SignInBody = req.body;

  const { token, id, email, firstName, lastName, photoUrl } = await signInUser(
    data
  );

  res.send({ id, email, firstName, lastName, photoUrl, token });
}
