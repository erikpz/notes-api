const { request, response } = require("express");

const validateRole = (req = request, res = response, next) => {
  if (!req.userPayload) {
    return res.status(500).json({
      ok: false,
      message: "Payload not valid in jwt",
      data: {},
    });
  }
  if (req.userPayload.role !== "ADMIN_ROLE") {
    return res.status(400).json({
      ok: false,
      message: "Only admin role permited",
      data: {},
    });
  }
  next();
};

module.exports = validateRole;
