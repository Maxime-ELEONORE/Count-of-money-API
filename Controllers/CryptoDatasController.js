import CoinGeckoService from '../Services/CoinGueckoService.js';
import CryptoData from '../Models/CryptoDataModel.js';

const CryptoDataController = {
    async updateMarketData(coinID) {
        const marketData = await CoinGeckoService.fetchMarketData(coinID);
        if (!marketData) return;

        const {market_data, symbol, name, market_cap_rank, circulating_supply, total_supply, max_supply} = marketData;
        await CryptoData.findOneAndUpdate(
            {coinID},
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
    async updateCandlestickData(coinID) {
        const candlesticksData4days = await CoinGeckoService.fetchCandlestickData(coinID);
        const candlesticksData4hours = await CoinGeckoService.fetchCandlestickData(coinID, 30);
        const candlesticksData30mins = await CoinGeckoService.fetchCandlestickData(coinID, 1);

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
            { coinID },
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
            const coinIds = req.body.coinIds.split(",");
            for (let coinId in coinIds){
                const datas = await CryptoData.findOne({coinID: coinId})
                result.append(datas);
            }
            res.status(200).send(result)
        } catch(err) {
            res.status(500).send({error: err})
        }
    },
};
export default CryptoDataController;
