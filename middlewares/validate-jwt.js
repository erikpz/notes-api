const jwt = require("jsonwebtoken");
const { response, request } = require("express");
const User = require("../models/user.model");

const validateJWT = async (req = request, res = response, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "User not autenticated",
        data: {},
      });
    }
    token = token.split(" ")[1];
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(payload.id);
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: "User not found and autenticated",
        data: {},
      });
    }
    req.userPayload = payload;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateJWT;
