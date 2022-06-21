const express = require('express');
const userController = require('../controller/userController');

const userRouter = express.Router();
userRouter
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.addUsers);
userRouter
  .route('/:id')
  .get(userController.getUserById)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = userRouter;
