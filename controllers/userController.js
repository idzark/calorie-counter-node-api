const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator/check');
const { sanitize } = require('express-validator/filter');

const User = mongoose.model('User');


exports.register = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = new User({ username, password });

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.array());
    return res.status(400).json({ errors: errors.array() });
  }

  await user.save();
  return res.sendStatus(204);
};

exports.getUserProfile = async (req, res) => {
  const userId = req.userId;

  const user = await User.findOne({ _id: userId }, '-_id, -password');
  return res.status(200).json(user);
};

exports.updateProfile = async (req, res) => {
  const userProfile = req.body;
  const userId = req.userId;

  await User.update({ _id: userId }, userProfile);
  const user = await User.findOne({ _id: userId }, '-_id, -password');

  return res.status(200).json(user);
};

exports.registerValidation = [
  sanitize('username'),
  check('username')
    .trim()
    .isLength({ min: 3, max: 16 })
    .withMessage('Username must be beetwen 3 and 16 characters long')
    .matches(/^\S*$/u)
    .withMessage('Spaces not allowed in username')
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      return !user;
    })
    .withMessage('This username is already taken'),
  check('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters long'),
  check('passwordConfirmation')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match')
];
