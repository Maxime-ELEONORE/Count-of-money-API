import express from 'express';
import UserController from '../controllers/UserController.js';
import authMiddleware from '../middlewares/Auth.js';

const UserRouter = express.Router();

UserRouter.use(authMiddleware);

UserRouter.post('/', UserController.createUser);
UserRouter.get('/', UserController.getAllUsers);
UserRouter.get('/:id', UserController.getUserById);
UserRouter.put('/:id', UserController.updateUser);
UserRouter.delete('/:id', UserController.deleteUser);

export default UserRouter;
