import CoinGeckoService from '../Services/CoinGueckoService.js';
import CryptoData from '../Models/CryptoDataModel.js';

const CryptoDataController = {
    async updateMarketData(cryptoID) {
        const marketData = await CoinGeckoService.fetchMarketData(cryptoID);
        if (!marketData) return;

        const {market_data, symbol, name, market_cap_rank, circulating_supply, total_supply, max_supply} = marketData;
        await CryptoData.findOneAndUpdate(
            {crypto: cryptoID},
            {
                symbol,
                name,
                rank: market_cap_rank,
                price: market_data.current_price.eur,
                priceChange24h: market_data.price_change_percentage_24h_in_currency.eur,
                volume24h: market_data.total_volume.eur,
                high24h: market_data.high_24h.eur,
                low24h: market_data.low_24h.eur,
                marketCap: market_data.market_cap.eur,
                circulatingSupply: circulating_supply,
                totalSupply: total_supply,
                maxSupply: max_supply,
                lastUpdated: market_data.last_updated
            },
            {upsert: true}
        );
    },
    async updateCandlestickData(cryptoID) {
        const candlesticksData4days = await CoinGeckoService.fetchCandlestickData(cryptoID);
        const candlesticksData4hours = await CoinGeckoService.fetchCandlestickData(cryptoID, 30);
        const candlesticksData30mins = await CoinGeckoService.fetchCandlestickData(cryptoID, 1);

        if (!candlesticksData4days || !candlesticksData4hours || !candlesticksData30mins) return;

        const formattedCandlesticks4days = candlesticksData4days.map(candle => ({
            open: candle[1],
            high: candle[2],
            low: candle[3],
            close: candle[4],
            volume: candle[5],
            timestamp: new Date(candle[0])
        }));

        const formattedCandlesticks4hours = candlesticksData4hours.map(candle => ({
            open: candle[1],
            high: candle[2],
            low: candle[3],
            close: candle[4],
            volume: candle[5],
            timestamp: new Date(candle[0])
        }));

        const formattedCandlesticks30mins = candlesticksData30mins.map(candle => ({
            open: candle[1],
            high: candle[2],
            low: candle[3],
            close: candle[4],
            volume: candle[5],
            timestamp: new Date(candle[0])
        }));

        await CryptoData.findOneAndUpdate(
            {crypto: cryptoID},
            { $push: {
                candlesticks4days: { $each: formattedCandlesticks4days },
                    candlesticks4hours: { $each: formattedCandlesticks4hours },
                    candlesticks30mins: { $each: formattedCandlesticks30mins },
                } },
            { upsert: true }
        );
    },
    async getDatas(req, res)  {
        try {
            let result = [];
            const cryptoIds = req.params.cryptoIds.split(',');
            console.log(req.params)
            console.log(cryptoIds)
            for (const cryptoId of cryptoIds){
                const datas = await CryptoData.findOne({crypto: cryptoId})
                result.append(datas);
            }
            res.status(200).send(result)
        } catch(err) {
            res.status(500).send({error: err})
        }
    },
};
export default CryptoDataController;
