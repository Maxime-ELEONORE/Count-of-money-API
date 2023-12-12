import express from 'express';
import KeywordsController from '../Controllers/KeywordsController.js';

const router = express.Router();

router.post('/keywords', KeywordsController.createKeyword);
router.get('/keywords/:id', KeywordsController.getKeywordById);
router.get('/keywords', KeywordsController.getAllKeywords);
router.put('/keywords/:id', KeywordsController.updateKeyword);
router.delete('/keywords/:id', KeywordsController.deleteKeyword);
export default router;
