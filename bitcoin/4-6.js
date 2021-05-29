'use strict';
const ccxt = require('ccxt');


const bitflyer = new ccxt.bitflyer({
    apiKey: '',
    secret: '',
})
const interval = 3000
const records = []

const sleep = (timer) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, timer)
    })
}

(async function() {

    while (true) {
        const ticker = await bitflyer.fetchTicker('FX_BTC_JPY')
        records.push(ticker.ask)
        //３つ以上配列の中に入っている場合一番古い配列（左端）を削除する
        if (records.length > 3) {
            records.shift()
        }
        console.log(records)
        if (records[0] < records[1] && records[1] < records[2]) {
            console.log('Price high')
            //３回上昇傾向が見られた為買い注文を行う
        }
        await sleep(interval)
    }

    // console.log (bitflyer.id,    await bitflyer.loadMarkets ())



    // console.log (bitflyer.id, await bitflyer.fetchBalance ())

    // sell 1 BTC/USD for market price, sell a bitcoin for dollars immediately
    // console.log(bitflyer.id, await bitflyer.createMarketSellOrder('FX_BTC_JPY', 0.01))

    // buy 1 BTC/USD for $2500, you pay $2500 and receive ฿1 when the order is closed
    // console.log(bitflyer.id, await bitflyer.createLimitBuyOrder('FX_BTC_JPY', 0.01, 2500.00))

    // pass/redefine custom exchange-specific order params: type, amount, price or whatever
    // use a custom order type
    // bitfinex.createLimitSellOrder ('BTC/USD', 1, 10, { 'type': 'trailing-stop' })
})();
