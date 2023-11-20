import Crypto from '../models/Crypto.js';
import CoinGeckoService from '../services/CoinGeckoService.js'

const CryptoController = {

    async create(req, res) {
        try {
            const newCrypto = new Crypto(req.body);
            const savedCrypto = await newCrypto.save();
            res.status(201).json(savedCrypto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async read(req, res) {
        try {
            const crypto = await Crypto.findById(req.params.id);
            if (!crypto) {
                return res.status(404).json({ message: 'Crypto not found' });
            }
            res.status(200).json(crypto);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const updatedCrypto = await Crypto.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedCrypto) {
                return res.status(404).json({ message: 'Crypto not found' });
            }
            res.status(200).json(updatedCrypto);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async delete(req, res) {
        try {
            const deletedCrypto = await Crypto.findByIdAndDelete(req.params.id);
            if (!deletedCrypto) {
                return res.status(404).json({ message: 'Crypto not found' });
            }
            res.status(200).json({ message: 'Crypto deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getAll(req, res) {
        try {
            const cryptos = await Crypto.find({});
            res.status(200).json(cryptos);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getTop100(req, res) {
        try {
            const response =  await CoinGeckoService.getTop100Cryptos();
            res.status(200).send(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async getCryptoHistory(req, res) {
        try {
            const coinId = req.params.coinId;
            const response = await CoinGeckoService.getCryptoHistory(coinId)
            res.status(200).send(response);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

export default CryptoController;
