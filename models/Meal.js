const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Product = mongoose.model('Product');

const mealSchema = new Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  ingredients: [Product.schema],
  weight: Number,
  protein: Number,
  carbs: Number,
  fats: Number,
  calories: Number,
  imageUrl: {
    type: String,
    default: 'https://images.pexels.com/photos/616404/pexels-photo-616404.jpeg?h=350&auto=compress&cs=tinysrgb'
  },
  category: String
});

module.exports = mongoose.model('Meal', mealSchema);
