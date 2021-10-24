import { Router } from 'express';
import { AuthenticateUserController } from './controller/AuthenticateUserController';
import { MessageController } from './controller/MessageController';
import { UserController } from './controller/UserController';
import { Autorizacao } from './middleware/Autorizacao';

const router = Router();

const authenticateUserController = new AuthenticateUserController();
router.post("/authenticate", authenticateUserController.handle);

router.use(Autorizacao);

const userController = new UserController();
router.get("/user/:id", userController.getById)

const messageController = new MessageController();
router.get("/message", messageController.get);
router.post("/message", messageController.post);

export { router };