import axios from "axios";

class CurrencyService {

    getIntradayPrice(symbol) {
        console.log("Getting prices for: ", symbol);
        return new Promise((resolve, reject) => {
            axios.get(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=${symbol}&market=USD&apikey=PWL76GK5NE8KLJRL`)
            .then(function (response) {
                // console.log("Status: ", response.status);
                // console.log("Status: ", response.statusText);
                if(response.status == 200) {
                    let data = response.data['Time Series (Digital Currency Intraday)'];
                    let prices = Object.keys(data).sort();
                    resolve(data[prices[prices.length-1]]);
                } else {
                    reject(response.statusText);
                }   
            })
            .catch(function (error) {
                console.log(error);
                reject(error);
            });

        });



       
    }
}

export default new CurrencyService();


