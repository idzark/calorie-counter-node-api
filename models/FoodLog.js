const mongoose = require('mongoose');

const Product = mongoose.model('Product');
const Schema = mongoose.Schema;

const foodLogSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: String,
  breakfast: [Product.schema],
  lunch: [Product.schema],
  dinner: [Product.schema],
  snacks: [Product.schema]
});

module.exports = mongoose.model('FoodLog', foodLogSchema);
