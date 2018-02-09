const mongoose = require('mongoose');


const Product = mongoose.model('Product');

exports.addProduct = async (req, res) => {
  const product = new Product({
    author: req.userId,
    name: req.body.name,
    protein: req.body.protein,
    carbs: req.body.carbs,
    fats: req.body.fats,
    calories: req.body.calories
  });

  await product.save();
  res.sendStatus(204);
};

exports.getProducts = async (req, res) => {
  const userId = req.userId;

  const products = await Product.find({ author: userId }, '-_id -author');

  res.status(200).json(products);
};
