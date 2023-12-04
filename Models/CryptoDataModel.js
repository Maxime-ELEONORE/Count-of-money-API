// CryptoData.js
import mongoose from 'mongoose';


const CandlestickSchema = new mongoose.Schema({
    open: Number,
    close: Number,
    high: Number,
    low: Number,
    volume: Number,
    timestamp: Date
}, { _id: false });

const CryptoDataSchema = new mongoose.Schema({
    coinID: {
        type: String,
        required: true
    },
    symbol: String,
    name: String,
    rank: Number,
    price: Number,
    priceChange24h: Number,
    volume24h: Number,
    high24h: Number,
    low24h: Number,
    marketCap: Number,
    circulatingSupply: Number,
    totalSupply: Number,
    maxSupply: Number,
    lastUpdated: Date,
    candlesticks4days: [CandlestickSchema],
    candlesticks4hours: [CandlestickSchema],
    candlesticks30mins: [CandlestickSchema]
});

export default mongoose.model('CryptoData', CryptoDataSchema);
