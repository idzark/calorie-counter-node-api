const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = mongoose.model('Product');

const mealSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  ingredients: [Product.schema],
  weightTotal: Number,
  proteinTotal: Number,
  carbsTotal: Number,
  fatsTotal: Number,
  caloriesTotal: Number,
  imageUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?h=350&auto=compress&cs=tinysrgb'
  }
});

module.exports = mongoose.model('Meal', mealSchema);
