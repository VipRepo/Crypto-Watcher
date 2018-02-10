import Currency from "../model/currency.model";
import currencyDetailController from "./currency-detail.controller";
import CurrencyDTO from "../model/currency.dto.model";


const currencyController = {};

  currencyController.findCurrency = (pattern) => {
    return new Promise((resolve, reject) => {
      Currency.aggregate( [ { $match : { name : pattern } } ])
      .then((currencies) => {
        console.log("Search result", currencies);
        resolve(currencies);
      },(error) => {
        reject(error);
      })
    })
  }

  currencyController.getAll = (pattern) => {
    console.log("Fetching all currencies");
    return new Promise((resolve, reject) => {
      let query = Currency.find({});
      if(pattern) {
        query.where('name').equals(new RegExp(pattern, 'i'));
      }
      query.then((currencies) => {
        let promises = [];
        currencies.forEach((currency) => {
         let promise =  currencyDetailController.findLatestPrice(currency.detailSchemaName);
          promises.push(promise);
        });
        Promise.all(promises).then((prices) => {
          // console.log("Before Resolving currencies", currencies);
         let newCurrencies = prices.map((price, index) => {
            console.log(`Price: ${price}, Index: ${index}`);
            let curr = currencies[index];
            return new CurrencyDTO(curr.id, curr.name, price);
          });
          resolve(newCurrencies);
        });
        
      },(error) => {
        reject(error);
      })
    })
  }

  currencyController.getCurrencyDetail = (currencyId) => {
    console.log("Currency ID:"+ currencyId);
    return new Promise((resolve, reject) => {
      Currency.find({id : currencyId}).then((currency) => {
        console.log(`Currency: ${JSON.stringify(currency, undefined, 2)}`);
        currencyDetailController.getAll(currency[0].detailSchemaName)
        .then((currencyDetail) => {
          resolve(currencyDetail);
        }).catch((err) => {
          console.log("Error occured while retrieving currency detail information: "+err);
          reject(err);
        });
      }).catch((error) => {
        console.log("Error occured while retrieving currency information: "+ error);
        reject(error);
      });
    })
  }

  export default currencyController;







