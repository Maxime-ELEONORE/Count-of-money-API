import 'dotenv/config'
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import UserRouter from './routers/UserRouter.js';
import AuthRouter from './routers/AuthRouter.js';

const app = express();
const port = 4000;

mongoose.connect(process.env.DB_URI)
    .then(() => console.log('Connection to MongoDB: SUCCESS !'))
    .catch(err => console.error('Connection to MongoDB: FAILED...', err));

app.use(cors());
app.use(express.json());

app.use(AuthRouter);
app.use('/users', UserRouter);

import axios from 'axios';

async function getCryptoPriceHistory(coinId) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`;
  const params = {
    vs_currency: 'eur',
    days: '30',
  };

  try {
    const response = await axios.get(url, { params });
    console.log(`History for ${coinId}:`, response.data);
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
  }
}

async function getTopCryptocurrencies() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets';
    const params = {
      vs_currency: 'eur',
      order: 'market_cap_desc',
      per_page: 50,
      page: 1
    };
  
    try {
      const response = await axios.get(url, { params });
      console.log('Top 50 cryptocurrencies:', response.data);
    } catch (error) {
      console.error('Error fetching top cryptocurrencies:', error);
    }
  }
  
// getTopCryptocurrencies();
// getCryptoPriceHistory('bitcoin');
// getCryptoPriceHistory('ethereum');

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});