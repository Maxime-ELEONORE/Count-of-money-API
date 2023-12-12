import express from 'express';
import CryptoDataController from '../Controllers/CryptoDatasController.js';

const router = express.Router();

router.get('/', CryptoDataController.getDatas);
export default router;