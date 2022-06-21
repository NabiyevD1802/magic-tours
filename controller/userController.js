const User = require('./../model/userModel');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      data: users,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};
const addUsers = async (req, res) => {
  try {
    const data = req.body;
    const user = await User.create(data);

    res.status(201).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (err) {
    res.status(404).json({
      status: 'FAIL',
      message: err.message,
    });
  }
};

module.exports = { getAllUsers, getUserById, addUsers, updateUser, deleteUser };
