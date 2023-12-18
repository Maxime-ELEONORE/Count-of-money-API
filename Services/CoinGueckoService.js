import axios from 'axios';
import Crypto from '../Models/CryptoModel.js';

const baseURL = 'https://api.coingecko.com/api/v3';
const apiKeys = [ process.env.COIN_GUEKO_API_KEY,  process.env.COIN_GUEKO_API_KEY2,  process.env.COIN_GUEKO_API_KEY3 ];
let apiKeyIndex = 0;
const CoinGeckoService = {
  getTop100Cryptos: async () => {
    try {
      const response = await axios.get(`${baseURL}/coins/markets`, {
        headers: {
          'x-cg-demo-api-key': apiKeys[apiKeyIndex%3],
        },
        params: {
          vs_currency: 'eur',
          order: 'market_cap_desc',
          per_page: 100,
          page: 1,
          sparkline: false,
        },
      });
      apiKeyIndex += 1;
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
      const response = await axios.get(`${baseURL}/coins/${coinId}`, {
        headers: {
          'x-cg-demo-api-key': apiKeys[apiKeyIndex%3],
        }});
      apiKeyIndex += 1;
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
        headers: {
          'x-cg-demo-api-key': apiKeys[apiKeyIndex%3],
        },
        params: { vs_currency: 'eur', days }
      });
      apiKeyIndex += 1;
      return response.data;
    } catch (error) {
      console.error("Error fetching candlestick data from CoinGecko:", error);
      return null;
    }
  },

};

export default CoinGeckoService;
