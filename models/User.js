const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required'],
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  }
});

userSchema.pre('save', async function hashPassword(next) {
  try {
    const user = this;

    if (!user.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model('User', userSchema);
