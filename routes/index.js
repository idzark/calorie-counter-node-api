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
router.put('/user', authController.isAuthenticated, userController.profileValidation, asyncHandler(userController.updateProfile));

router.post('/product', authController.isAuthenticated, foodController.productValidation, asyncHandler(foodController.addProduct));
router.put('/products/:id', authController.isAuthenticated, foodController.productValidation, asyncHandler(foodController.updateProduct));
router.get('/products', authController.isAuthenticated, asyncHandler(foodController.getProducts));
router.delete('/products/:id', authController.isAuthenticated, asyncHandler(foodController.deleteProduct));

router.post('/meal', authController.isAuthenticated, foodController.mealValidation, asyncHandler(foodController.addMeal));
router.put('/meals/:id', authController.isAuthenticated, foodController.mealValidation, asyncHandler(foodController.updateMeal));
router.get('/meals', authController.isAuthenticated, asyncHandler(foodController.getMeals));
router.delete('/meals/:id', authController.isAuthenticated, asyncHandler(foodController.deleteMeal));

router.post('/foodlog', authController.isAuthenticated, asyncHandler(foodController.addFoodLog));
router.put('/foodlog', authController.isAuthenticated, asyncHandler(foodController.updateFoodLog));
router.get('/foodlogs', authController.isAuthenticated, asyncHandler(foodController.getFoodLog));


module.exports = router;
