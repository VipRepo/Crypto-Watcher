import mongoose from 'mongoose';
import express from 'express';
import currencyController from '../controllers/currency.controller';
import currencyService from "../service/currency.price.service";
import DetailDTO from "../model/detail.dto.model";

const router = express.Router();

router.get('/', function(req, res) {
        console.log("Query: "+ JSON.stringify(req.query));
        let pattern = null;
        if(req.query && req.query.pattern) {
          pattern = req.query.pattern;
        }
          currencyController.getAll(pattern).then((currencies) => {
            res.send(currencies);
          }).catch((error) => {
            res.send("Error occured while fetching trades");
          })
        
  });

  router.get('/:currencyId', function(req, res) {
          currencyController.getCurrencyDetail(req.params.currencyId)
          .then((currencyDetail) => {
            res.send(currencyDetail);
          }).catch((error) => {
            res.send("Error occured while fetching Currency Detail");
          })
    });

    router.get('/:currencyId/latest', function(req, res) {
      currencyService.getIntradayPrice(req.params.currencyId)
      .then((price) => {
        let detail = new DetailDTO(price['1a. price (USD)'], price['2. volume'], undefined);
        res.send(detail);
      }).catch((error) => {
        console.log("Error occured while fetching live currency price", error);
        res.send("Error occured while fetching live currency price");
      })
  });


export default router;
