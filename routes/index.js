const express = require('express');
const { asyncHandler } = require('../handlers/errorHandlers');

const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', (req, res) => {
  res.send('hello world');
});

router.post('/register', asyncHandler(userController.register));
router.post('/login', asyncHandler(authController.login));

module.exports = router;
