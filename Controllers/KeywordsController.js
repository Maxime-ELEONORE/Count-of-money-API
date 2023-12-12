import Keyword from '../Models/KeywordModel.js';

const KeywordsController = {
    createKeyword: async (req, res) => {
        try {
            const newKeyword = new Keyword(req.body);
            const savedKeyword = await newKeyword.save();
            res.status(201).json(savedKeyword);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getKeywordById: async (req, res) => {
        try {
            const keyword = await Keyword.findById(req.params.id);
            res.status(200).json(keyword);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllKeywords: async (req, res) => {
        try {
            const keywords = await Keyword.find();
            res.status(200).json(keywords);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateKeyword: async (req, res) => {
        try {
            const updatedKeyword = await Keyword.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(updatedKeyword);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteKeyword: async (req, res) => {
        try {
            await Keyword.findByIdAndDelete(req.params.id);
            res.status(200).json("Keyword has been deleted...");
        } catch (error) {
            res.status(500).json(error);
        }
    }
}
export default KeywordsController;
