import CoinGeckoService from '../Services/CoinGueckoService.js';
import Crypto from '../Models/CryptoModel.js';

const CryptosJobs = {
  updateHistory: async () => {
    try {
      const cryptos = await Crypto.find();
      for (const crypto of cryptos) {
        const history = await CoinGeckoService.getCryptoHistory(crypto.coinID);
        console.log(history);
      }
    } catch (err) {
      console.error('Error updating crypto history:', err);
    }
  },
};

export default CryptosJobs;
