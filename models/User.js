const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    required: [true, 'Username is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  height: { type: Number, default: 175 },
  weight: { type: Number, default: 75 },
  calories: { type: Number, default: 2500 },
  proteinPercentage: { type: Number, default: 30 },
  carbsPercentage: { type: Number, default: 45 },
  fatsPercentage: { type: Number, default: 25 }
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
