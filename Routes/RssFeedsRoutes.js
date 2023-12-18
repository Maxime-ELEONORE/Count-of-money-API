import express from 'express';
import RssFeedsController from '../Controllers/RssFeedsController.js';

const router = express.Router();

router.get('/', RssFeedsController.getRssFeedsByKeywords);
router.get('/id/:id', RssFeedsController.getArticleById);


export default router;