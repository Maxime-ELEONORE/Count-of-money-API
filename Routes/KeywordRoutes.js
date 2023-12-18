import express from 'express';
import KeywordsController from '../Controllers/KeywordsController.js';

const router = express.Router();

router.post('/', KeywordsController.createKeyword);
router.get('/:id', KeywordsController.getKeywordById);
router.get('/', KeywordsController.getAllKeywords);
router.put('/:id', KeywordsController.updateKeyword);
router.delete('/:id', KeywordsController.deleteKeyword);
export default router;
