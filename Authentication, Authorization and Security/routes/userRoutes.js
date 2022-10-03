const express = require("express");
const { router } = require("../app");
const Router = express.Router();
const userController = require("./../Controller/userController");
const authController = require("./../Controller/authController");

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);
Router.post("/forgotPassword", authController.forgotPassword);
Router.patch("/updateMe", authController.protect, userController.updateMe);
Router.delete("/deleteMe", authController.protect, userController.deleteMe);
Router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
Router.patch("/resetPassword/:token", authController.resetPassword);
Router.route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

Router.route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
