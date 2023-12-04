import CoinGeckoService from '../Services/CoinGueckoService.js';
import Crypto from '../Models/CryptoModel.js';
import CryptoDataController from '../Controllers/CryptoDatasController.js';

const CryptosJobs = {
  updateCryptoDatas: async () => {
    try {
      const cryptos = await Crypto.find();
      for (const crypto of cryptos) {
        await CryptoDataController.updateMarketData(crypto.coinID)
        await CryptoDataController.updateCandlestickData(crypto.coinID)
      }
    } catch (err) {
      console.error('Error updating crypto history:', err);
    }
  },

};

export default CryptosJobs;
