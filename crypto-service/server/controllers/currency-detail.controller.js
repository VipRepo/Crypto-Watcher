import CurrencySchema from '../Schema/currency-detail.schema';
import mongoose from 'mongoose';


const currencyDetailController = {};

  currencyDetailController.getAll = (schema) => {
      console.log("Schema: "+ schema)
    let model = mongoose.model(schema, CurrencySchema, schema);
    return new Promise((resolve, reject) => {
      model.find({}, 'date txVolume(USD) price(USD)')
      .sort('-date')
      .then((currencies) => {
        resolve(currencies);
      },(error) => {
        reject(error);
      })
    })
  }

  // currencyDetailController.find = (startDate, endDate, name) => {
  //   return new Promise((resolve, reject) => {
  //     let query = Currency.find({});

  //     if(startDate && endDate) {
  //       query.where('date').gt(new Date(startDate)).lt(new Date(endDate));
  //     }
  //     if(name) {
  //       query.where('name').equals(name);
  //     }
  //     query.exec((err, currencies) => {
  //       if(err) {
  //         reject(err);
  //         return;
  //       }
  //       resolve(currencies);
  //     }); 
     
  //   });
  // }

  currencyDetailController.findLatestPrice = (schema) => {
    let model = mongoose.model(schema, CurrencySchema, schema);
    return new Promise((resolve, reject) => {
      model.find({})
      .sort([['date', -1]])
      .limit(1)
      .exec((err, detail) => {
        if(err) {
          reject(err);
          return;
        }
        // console.log("Detail: ", detail);
        // console.log("Detail Price: ", detail[0].price);
        resolve(detail[0]['price(USD)']);
      });
      
    })
  }

  export default currencyDetailController;







