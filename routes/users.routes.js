const { Router } = require("express");
const { check } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validate-fields");
const Role = require("../models/role.model");
const { roleValidation } = require("../utils/db-validators");

const routerUsers = Router();

routerUsers.get("/", getUsers);
routerUsers.post(
  "/",
  [
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("password", "Password must be min 5 characters, max 15").isLength({
      min: 5,
      max: 15,
    }),
    check("role").custom(roleValidation),
    validateFields,
  ],
  createUser
);
routerUsers.put("/:id", updateUser);
routerUsers.delete("/", deleteUser);

module.exports = routerUsers;
