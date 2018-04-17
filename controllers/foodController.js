const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');

const Product = mongoose.model('Product');
const Meal = mongoose.model('Meal');
const FoodLog = mongoose.model('FoodLog');

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

exports.addMeal = async (req, res) => {
  const meal = new Meal(req.body);
  meal.author = req.userId;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }

  await meal.save();
  return res.sendStatus(204);
};


exports.getProducts = async (req, res) => {
  const userId = req.userId;

  const products = await Product.find({ author: userId }, '-author');

  res.status(200).json(products);
};

exports.getMeals = async (req, res) => {
  const userId = req.userId;

  const meals = await Meal.find({ author: userId }, '-author');

  res.status(200).json(meals);
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

exports.mealValidation = [
  check('name')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Name is required')
    .isLength({ max: 20 })
    .withMessage('Name must be a maximum of 20 characters long')
    .custom(async (value, { req }) => {
      const meal = await Meal.findOne({ name: value, author: req.userId });
      return !meal;
    })
    .withMessage('You already added product with that name'),
  check('category')
    .exists()
    .withMessage('Please choose category')
];

exports.addFoodLog = async (req, res) => {
  const foodLog = new FoodLog(req.body);
  foodLog.author = req.userId;

  await foodLog.save();
  return res.sendStatus(204);
};

exports.getFoodLog = async (req, res) => {
  const userId = req.userId;
  const foodlogDate = req.query.date;

  const foodLog = await FoodLog.find({ author: userId, date: foodlogDate }, '-_id -author');

  return res.status(200).json(foodLog);
};

exports.updateFoodLog = async (req, res) => {
  const updateData = req.body;
  const userId = req.userId;
  const date = req.body.date;
  const foodLog = await FoodLog.findOne({ author: userId, date });

  await foodLog.update(updateData);
  return res.sendStatus(204);
};
