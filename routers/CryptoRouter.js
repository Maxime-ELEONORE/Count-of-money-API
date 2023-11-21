import express from 'express';
import CryptoController from '../controllers/CryptoController.js';
import authMiddleware from '../middlewares/Auth.js';
import userMiddlewares from '../middlewares/UserMiddlewares.js';

const CryptoRouter = express.Router();

CryptoRouter.post('/', authMiddleware, userMiddlewares.isAdmin, CryptoController.create);
CryptoRouter.get('/:id', CryptoController.read);
CryptoRouter.put('/:id', authMiddleware, userMiddlewares.isAdmin, CryptoController.update);
CryptoRouter.delete('/:id', authMiddleware, userMiddlewares.isAdmin, CryptoController.delete);
CryptoRouter.get('/', CryptoController.getAll);
CryptoRouter.get('/history/:coinId', CryptoController.getCryptoHistory);
CryptoRouter.get('/admin/top100', authMiddleware, userMiddlewares.isAdmin, CryptoController.getTop100)

export default CryptoRouter;