const { Router } = require("express");
const { check, query, param } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
  deleteUserAdmin,
} = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");
const { emailValidation, userExists } = require("../utils/db-validators");

const routerUsers = Router();

/* routerUsers.use(validateJWT);
routerUsers.use(validateRole); */

routerUsers.get(
  "/",
  [
    validateJWT,
    validateRole,
    query("amount", "Must be an number").optional().isNumeric(),
    query("page", "Must be an number").optional().isNumeric(),
    validateFields,
  ],
  getUsers
);

routerUsers.get(
  "/:id",
  [validateJWT, param("id", "Id not valid").isMongoId(), validateFields],
  getUser
);

routerUsers.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailValidation),
    check("password", "Password must be min 5 characters, max 15").isLength({
      min: 5,
      max: 15,
    }),
    check("role", "Invalid role, only user role permited").isIn(["USER_ROLE"]),
    validateFields,
  ],
  createUser
);

routerUsers.post(
  "/create-admin",
  [
    validateJWT,
    validateRole,
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("email", "Email is required").not().isEmpty(),
    check("email", "Email is not valid").isEmail(),
    check("email").custom(emailValidation),
    check("password", "Password must be min 5 characters, max 15").isLength({
      min: 5,
      max: 15,
    }),
    check("role", "Invalid role, only admin role permited").isIn([
      "ADMIN_ROLE",
    ]),
    validateFields,
  ],
  createUser
);

routerUsers.put(
  "/:id",
  [
    validateJWT,
    check("id", "Id not valid").isMongoId(),
    check("id", "User not exists").custom(userExists),
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("profileImage", "Profile image is required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

routerUsers.put(
  "/update-admin/:id",
  [
    validateJWT,
    validateRole,
    param("id", "Id not valid").isMongoId(),
    param("id", "User not exists").custom(userExists),
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("profileImage", "Profile image is required").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

routerUsers.delete(
  "/:id",
  [validateJWT, check("id", "Id not valid").isMongoId(), validateFields],
  deleteUser
);

routerUsers.delete(
  "/delete-admin/:id",
  [
    validateJWT,
    validateRole,
    check("id", "Id not valid").isMongoId(),
    validateFields,
  ],
  deleteUserAdmin
);

module.exports = routerUsers;
