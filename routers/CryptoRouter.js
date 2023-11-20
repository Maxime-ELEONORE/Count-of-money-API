import express from 'express';
import CryptoController from '../controllers/CryptoController.js';

const CryptoRouter = express.Router();

CryptoRouter.post('/', CryptoController.create);
CryptoRouter.get('/:id', CryptoController.read);
CryptoRouter.put('/:id', CryptoController.update);
CryptoRouter.delete('/:id', CryptoController.delete);
CryptoRouter.get('/', CryptoController.getAll);

export default CryptoRouter;
