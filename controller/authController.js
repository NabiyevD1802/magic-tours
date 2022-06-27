const User = require('../model/userModel');
const catchErrorAsync = require('../utility/catchAsync');
const jwt = require('jsonwebtoken');
const AppError = require('../utility/appError');
const bcryptjs = require('bcryptjs');

const createToken = (id) =>
  jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signup = async (req, res, next) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo,
      passwordConfirm: req.body.passwordConfirm,
    });

    const token = createToken(newUser._id);
    res.status(200).json({
      status: 'success',
      token: token,
      data: newUser,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = { ...req.body };

    if (!email || !password) {
      return next();
    }

    const user = await User.findOne({ email });

    if (!user) {
      return next();
    }

    const tekshirHashga = (oddiyPassword, hashPassword) => {
      return bcryptjs.compare(oddiyPassword, hashPassword);
    };

    if (!(await tekshirHashga(password, User.password))) {
      return next();
    }

    const token = createToken(user._id);

    res.status(200).json({
      status: 'success',
      token: token,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

const protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return next();
    }

    const tekshir = await jwt.verify(token, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    if (!tekshir) {
      return next();
    }
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

module.exports = { signup, login, protect };
