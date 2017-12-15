const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.register = async (req, res) => {
  const userData = req.body;
  const user = new User(userData);

  await user.save();
  res.sendStatus(200);
};
