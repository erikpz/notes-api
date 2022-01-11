const { compareSync } = require("bcrypt");
const { response } = require("express");
const User = require("../models/user.model");
const generateJWT = require("../utils/generateJWT");

const login = async (req, res = response, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
        data: {},
      });
    }

    const correctPass = compareSync(password, user.password);

    if (!correctPass) {
      return res.status(401).json({
        ok: false,
        message: "User not autenticated",
        data: {},
      });
    }

    const token = await generateJWT(user);

    const { __v, role, email: em, password: pass, ...userFiltered } = user._doc;

    res.json({
      ok: true,
      message: "User autenticated",
      data: {
        user: userFiltered,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
};
