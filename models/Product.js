const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  protein: Number,
  carbs: Number,
  fats: Number,
  calories: Number
});

module.exports = mongoose.model('Product', productSchema);
