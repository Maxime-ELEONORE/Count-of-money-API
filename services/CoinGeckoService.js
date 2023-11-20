import axios from 'axios';
import rateLimit from 'axios-rate-limit';

const baseURL = 'https://api.coingecko.com/api/v3';

const http = rateLimit(axios.create(), { maxRequests: 3, perMilliseconds: 60000})

const CoinGeckoService = {

    getTop100Cryptos: async () => {
        try {
            const response = await http.get(`${baseURL}/coins/markets`, {
                params: {
                    vs_currency: 'eur',
                    order: 'market_cap_desc',
                    per_page: 100,
                    page: 1,
                    sparkline: false
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching top 100 cryptos:', error);
            throw error;
        }
    },

    getCryptoHistory: async (coinId, days = 30) => {
        try {
            const response = await http.get(`${baseURL}/coins/${coinId}/market_chart`, {
                params: {
                    vs_currency: 'eur',
                    days: days
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching history for ${coinId}:`, error);
            throw error;
        }
    },

    getCryptoDetails: async (coinId) => {
        try {
            const response = await http.get(`${baseURL}/coins/${coinId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching details for ${coinId}:`, error);
            throw error;
        }
    }
};

export default CoinGeckoService;
