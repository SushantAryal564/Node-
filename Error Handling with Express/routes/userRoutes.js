const express = require('express');
const Router = express.Router();
const userController = require('./../Controller/userController');
Router.route('/')
  .get(userController.getAllUser)
  .post(userController.createUser);

Router.route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
