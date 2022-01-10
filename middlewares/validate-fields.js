const { validationResult } = require("express-validator");

const validateFields = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      message: "Operation failed!",
      data: errors,
    });
  }

  next();
};

module.exports = {
  validateFields,
};
