import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/Auth.js';
import userMiddlewares from '../middlewares/UserMiddlewares.js';

const UserRouter = express.Router();

UserRouter.use(authMiddleware);

UserRouter.post('/', userMiddlewares.isAdmin, UserController.createUser);
UserRouter.get('/', userMiddlewares.isAdmin, UserController.getAllUsers);
UserRouter.get('/:id', userMiddlewares.isAuthorized, UserController.getUserById);
UserRouter.put('/:id', userMiddlewares.isAuthorized, UserController.updateUser);
UserRouter.delete('/:id', userMiddlewares.isAdmin, UserController.deleteUser);

export default UserRouter;
