import { Router } from 'express';
import * as messageController from '../controllers/message.controller';
import validateToken from '../middlewares/validateToken.middleware';

const messagesRouter = Router();

messagesRouter.get('/chats', validateToken, messageController.getChats);

export default messagesRouter;
