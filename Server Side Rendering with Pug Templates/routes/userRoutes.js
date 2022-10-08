const express = require("express");
const { router } = require("../app");
const Router = express.Router();
const userController = require("./../Controller/userController");
const authController = require("./../Controller/authController");

Router.post("/signup", authController.signup);
Router.post("/login", authController.login);
Router.post("/forgotPassword", authController.forgotPassword);
Router.patch("/resetPassword/:token", authController.resetPassword);

Router.use(authController.protect);
// Protect all the routes that come after this point.
Router.patch("/updateMyPassword", authController.updatePassword);

Router.get("/me", userController.getMe, userController.getUser);

Router.patch("/updateMe", userController.updateMe);

Router.delete("/deleteMe", userController.deleteMe);
Router.use(authController.restrictTo("admin"));
Router.route("/")
  .get(userController.getAllUser)
  .post(userController.createUser);

Router.route("/:id")
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = Router;
