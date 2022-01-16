const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { userExistsByEmail } = require("../utils/db-validators");

const authRouter = Router();

authRouter.post(
  "/login",
  [
    check("email", "Email not valid").isEmail(),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  login
);

module.exports = authRouter;
