import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { validateSchema } from '../middlewares/validateSchema.middleware';
import { signInSchema, signUpSchema } from '../schemas/auth.schema';

const authRouter: Router = Router();

authRouter.post(
  '/sign-up',
  validateSchema(signUpSchema),
  authController.signUp
);
authRouter.post(
  '/sign-in',
  validateSchema(signInSchema),
  authController.signIn
);

export default authRouter;
