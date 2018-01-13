const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

const User = mongoose.model('User');
require('dotenv').config({ path: 'variables.env' });

exports.login = async (req, res) => {
  const loginData = req.body;

  const user = await User.findOne({ username: loginData.username });

  if (!user) {
    res.status(401).send({ message: 'Username or Password invalid' });
  }

  const passwordIsMatch = await bcrypt.compare(loginData.password, user.password);

  if (!passwordIsMatch) {
    res.status(401).send({ message: 'Username or Password invalid' });
  }

  const payload = { sub: user._id };
  const token = jwt.encode(payload, process.env.SECRET);

  res.status(200).send({ token });
};

exports.isAuthenticated = (req, res, next) => {
  if (!req.header('authorization')) {
    res.status(401).send({ message: 'Unauthorized' });
  }

  const token = req.header('authorization').split(' ')[1];
  const payload = jwt.decode(token, process.env.SECRET);

  if (!payload) {
    res.status(401).send({ message: 'Unauthorized' });
  }

  req.userId = payload.sub;
  next();
};
