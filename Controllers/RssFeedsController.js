import RssFeedsService from '../Services/RssFeedsService.js';
import Keyword from "../Models/KeywordModel.js";

const RssFeedsController = {
  
  async getRssFeedsByKeywords(req, res) {
    try {
      const keywordDocs = await Keyword.find({ userIds: { $in: [req.user.userId] } });

      const keywords = keywordDocs.map(doc => doc.keyword);
      const response = await RssFeedsService.getRssFeedsByKeywords(keywords, 5);
      res.status(200).send(response);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  },

  async getArticleById(req, res) {
    try {
      const { id } = req.params;
      const article = await RssFeedsService.getArticleById(id);
      if (article) {
        res.status(200).json(article);
      } else {
        res.status(404).json({ message: 'Article not found' });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
  
};

export default RssFeedsController;