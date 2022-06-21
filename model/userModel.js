const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  active: Boolean,
  photo: String,
  password: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;
