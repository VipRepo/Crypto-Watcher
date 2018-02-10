import mongoose from 'mongoose';

const CurrencyDetailSchema = new mongoose.Schema({
  date: String,
  'price(USD)': String,
  'txVolume(USD)': Number
});

export default CurrencyDetailSchema;
