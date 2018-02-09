const mongoose = require('mongoose');
/* const jwt = require('jwt-simple'); */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator/check');


const User = mongoose.model('User');
require('dotenv').config({ path: 'variables.env' });

exports.login = async (req, res) => {
  const loginData = req.body;

  const user = await User.findOne({ username: loginData.username });

  /* if (!user) {
    res.status(401).json({ message: 'Username or Password invalid' });
  }

  const passwordIsMatch = await bcrypt.compare(loginData.password, user.password);

  if (!passwordIsMatch) {
    res.status(401).json({ message: 'Username or Password invalid' });
  } */

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array({ onlyFirstError: false }) });
  }

  const payload = {
    sub: user._id,
    username: loginData.username
  };
  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 6000 });

  res.status(200).json({ token });
};

exports.loginValidation = [
  check('password')
    .custom(async (value, { req }) => {
      const user = await User.findOne({ username: req.body.username });
      const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
      return passwordsMatch;
    })
    .withMessage('Username or password invalid')
];

exports.isAuthenticated = (req, res, next) => {
  if (!req.header('authorization')) {
    res.status(401).send({ message: 'Unauthorized' });
  }

  const token = req.header('authorization').split(' ')[1];
  const payload = jwt.verify(token, process.env.SECRET);

  if (!payload) {
    res.status(401).send({ message: 'Unauthorized' });
  }

  req.userId = payload.sub;
  next();
};
