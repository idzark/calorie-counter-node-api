const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');

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

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  await product.save();
  return res.sendStatus(204);
};

exports.getProducts = async (req, res) => {
  const userId = req.userId;

  const products = await Product.find({ author: userId }, '-_id -author');

  res.status(200).json(products);
};

exports.productValidation = [
  check('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isLength({ max: 15 })
    .withMessage('Name must be a maximum of 15 characters long')
    .custom(async (value, { req }) => {
      const product = await Product.findOne({ name: value, author: req.userId });
      return !product;
    })
    .withMessage('You already added product with that name'),
  check('protein')
    .trim()
    .isInt()
    .withMessage('Protein amount must be a number'),
  check('carbs')
    .trim()
    .isInt()
    .withMessage('Carbs amount must be a number'),
  check('fats')
    .trim()
    .isInt()
    .withMessage('Fats amount must be a number'),
  check('calories')
    .trim()
    .isInt()
    .withMessage('Calories amount must be a number')
];
