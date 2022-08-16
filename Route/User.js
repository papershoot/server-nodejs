const middlewareController = require("../Controller/middlewareController");
const UserController = require("../Controller/UserController");

const RouteUser = require("express").Router();

//Register user
RouteUser.post("/resgister", UserController.addUser);

//Login
RouteUser.post("/api/login", UserController.LoginUser);

//get user
RouteUser.get("/", UserController.getallUser);

//get a User
RouteUser.get("/:id", UserController.getAUser);

//update user
RouteUser.put("/:id", UserController.UpdateUser);

//change password
RouteUser.put("/password/:id", UserController.Change);

//delete user
RouteUser.delete("/:id", UserController.DeletedUser);

module.exports = RouteUser;