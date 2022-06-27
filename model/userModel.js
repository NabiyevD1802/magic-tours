const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Ismingizni kiritishingiz shart!'],
    maxlength: 64,
    minlength: 1,
    trim: true,
  },
  email: {
    type: String,
    unique: [true, 'Bunaqa email mavjud!'],
    required: [true, 'Emailgizni kiritishingiz shart!'],
    lowercase: true,
    validate: {
      validator: function (val) {
        return validator.isEmail(val);
      },
      message: 'Siz emailni xato kiritingiz!',
    },
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'guide', 'team-lead'],
  },
  password: {
    type: String,
    required: [true, 'Passwordni kiritishingiz shart!'],
    validate: {
      validator: function (val) {
        return validator.isStrongPassword(val);
      },
      message: "Siz xavfsizligi kuchsiz bo'lgan password kiritdingiz!",
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, 'PasswordConfirmni kiritishingiz shart!'],
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: 'Siz bir xil password kiritishingiz kerak!',
    },
  },
});
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  const hashPassword = await bcryptjs.hash(this.password, 12);

  this.password = hashPassword;
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('users', userSchema);

module.exports = User;
