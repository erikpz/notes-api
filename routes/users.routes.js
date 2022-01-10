const { Router } = require("express");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");

const routerUsers = Router();

routerUsers.get("/", getUsers);
routerUsers.post("/", createUser);
routerUsers.put("/:id", updateUser);
routerUsers.delete("/", deleteUser);

module.exports = routerUsers;
