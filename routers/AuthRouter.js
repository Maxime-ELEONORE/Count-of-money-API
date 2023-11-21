import express from 'express';
import AuthController from '../controllers/AuthController.js';

const AuthRouter = express.Router();

AuthRouter.post('/register', AuthController.register);
AuthRouter.post('/login', AuthController.login);
AuthRouter.post('/logout', AuthController.logout);

AuthRouter.get('/google', AuthController.googleAuth);
AuthRouter.get('/google/callback', AuthController.googleAuthCallback);

export default AuthRouter;
