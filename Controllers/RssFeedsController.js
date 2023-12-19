import RssFeedsService from '../Services/RssFeedsService.js';

const RssFeedsController = {
  
  async getRssFeedsByKeywords(req, res) {
    try {
      const keywords = req.query.keywords ? req.query.keywords.split(',') : ['bitcoin'];
      const articlesPerKeywords = req.query.articlesperkeywords ? parseInt(req.query.articlesperkeywords, 10) : 1;

      const response = await RssFeedsService.getRssFeedsByKeywords(keywords, articlesPerKeywords);
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