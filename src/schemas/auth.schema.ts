import Joi from 'joi';
import { SignInBody, SignUpBody } from '../types/auth.types';

export const signUpSchema = Joi.object<SignUpBody>({
  email: Joi.string().lowercase().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.valid(Joi.ref('password')).required(),
});

export const signInSchema = Joi.object<SignInBody>({
  email: Joi.string().lowercase().email().required(),
  password: Joi.string().required(),
});
