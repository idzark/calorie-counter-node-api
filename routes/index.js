const express = require('express');
const { asyncHandler } = require('../handlers/errorHandlers');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const foodController = require('../controllers/foodController');


router.get('/', (req, res) => {
  res.send('hello world');
});

router.get('/user', authController.isAuthenticated, asyncHandler(userController.getUserProfile));
router.post('/register', userController.registerValidation, asyncHandler(userController.register));
router.post('/login', authController.loginValidation, asyncHandler(authController.login));
router.put('/user', authController.isAuthenticated, asyncHandler(userController.updateProfile));

router.post('/product', authController.isAuthenticated, foodController.productValidation, asyncHandler(foodController.addProduct));
router.get('/products', authController.isAuthenticated, asyncHandler(foodController.getProducts));

router.post('/meal', authController.isAuthenticated, asyncHandler(foodController.addMeal));
router.get('/meals', authController.isAuthenticated, asyncHandler(foodController.getMeals));

router.post('/foodlog', authController.isAuthenticated, asyncHandler(foodController.addFoodLog));
router.put('/foodlog', authController.isAuthenticated, asyncHandler(foodController.updateFoodLog));
router.get('/foodlogs', authController.isAuthenticated, asyncHandler(foodController.getFoodLog));


module.exports = router;
