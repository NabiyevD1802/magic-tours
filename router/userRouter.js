const express = require('express');
const userController = require('../controller/userController');
const authController = require('../controller/authController');
const userRouter = express.Router();

userRouter.route('/signup').post(authController.signup);
userRouter.route('/signin').post(authController.login);

userRouter
  .route('/')
  .get(authController.protect, userController.getAllUsers)
  .post(userController.addUsers);
userRouter
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
