const { Router } = require("express");
const { check, query, param } = require("express-validator");
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser,
} = require("../controllers/users.controller");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const validateRole = require("../middlewares/validate-role");
const {
  roleValidation,
  emailValidation,
  userExists,
} = require("../utils/db-validators");

const routerUsers = Router();

/* routerUsers.use(validateJWT);
routerUsers.use(validateRole); */

routerUsers.get(
  "/",
  [
    validateJWT,
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
    check("role").custom(roleValidation),
    validateFields,
  ],
  createUser
);

routerUsers.put(
  "/:id",
  [
    validateJWT,
    validateRole,
    check("id", "Id not valid").isMongoId(),
    check("id").custom(userExists),
    check("name", "Name is required").not().isEmpty(),
    check("lastname", "Lastname is required").not().isEmpty(),
    check("profileImage", "Profile image is required").not().isEmpty(),
    check("role", "Role required").not().isEmpty(),
    check("role").custom(roleValidation),
    validateFields,
  ],
  updateUser
);

routerUsers.delete(
  "/:id",
  [
    validateJWT,
    validateRole,
    check("id", "Id not valid").isMongoId(),
    validateFields,
  ],
  deleteUser
);

module.exports = routerUsers;
