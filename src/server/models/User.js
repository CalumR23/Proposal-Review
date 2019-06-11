const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: (value)=> {
      return validator.isLength(value, {min: 1});
    }
  },
  lastName: {
    type: String,
    required: true,
    validate: (value)=> {
      return validator.isLength(value, {min: 1})
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: (value)=> {
      return validator.isEmail(value);
    }
  },
  googleID: {
    type: String,
    unique: true
  }
});

module.exports = mongoose.model('User', UserSchema);
