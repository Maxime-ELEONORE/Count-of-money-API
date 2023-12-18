import axios from 'axios';
import Crypto from '../Models/CryptoModel.js';

const baseURL = 'https://api.coingecko.com/api/v3';

const CoinGeckoService = {

  getTop100Cryptos: async () => {
    try {
      const response = await axios.get(`${baseURL}/coins/markets`, {
        headers: {
          'x-cg-demo-api-key': process.env.COIN_GUEKO_API_KEY,
        },
        params: {
          vs_currency: 'eur',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching top 100 cryptos:', error);
      throw error;
    }
  },

  fetchMarketData: async (cryptoID) => {
    try {
      const crypto = await Crypto.findById(cryptoID);
      const coinId = crypto.coinID;
      const response = await axios.get(`${baseURL}/coins/${coinId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching market data from CoinGecko:", error);
      return null;
    }
  },

  fetchCandlestickData: async (cryptoID, days = 'max') => {
    try {
      const crypto = await Crypto.findById(cryptoID);
      const coinId = crypto.coinID;
      const response = await axios.get(`${baseURL}/coins/${coinId}/ohlc`, {
        params: { vs_currency: 'eur', days }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching candlestick data from CoinGecko:", error);
      return null;
    }
  },

};

export default CoinGeckoService;
