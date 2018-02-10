import mongoose from 'mongoose';

const CurrencySchema = new mongoose.Schema({
    id: String,
    name: String,
    detailSchemaName:String
  }, { collection: 'currency' });
  
  export default mongoose.model('currency', CurrencySchema);
  