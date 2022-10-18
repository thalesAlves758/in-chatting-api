import { Router } from 'express';
import authRouter from './auth.routes';
import messagesRouter from './messages.routes';

const router: Router = Router();

router.use(authRouter);
router.use(messagesRouter);

export default router;
