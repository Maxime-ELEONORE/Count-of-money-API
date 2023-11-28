import axios from 'axios';

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

  getCryptoHistory: async (coinId, days = 30) => {
    try {
      const response = await axios.get(`${baseURL}/coins/${coinId}/market_chart`, {
        headers: {
          'x-cg-demo-api-key': process.env.COIN_GUEKO_API_KEY,
        },
        params: {
          vs_currency: 'eur',
          days: days,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching history for ${coinId}:`, error);
      throw error;
    }
  },
};

export default CoinGeckoService;
