import Joi from 'joi';
import { SignUpBody } from '../types/auth.types';

export const signUpSchema = Joi.object<SignUpBody>({
  email: Joi.string().email().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.valid(Joi.ref('password')).required(),
  photoUrl: Joi.string().uri().required(),
});
