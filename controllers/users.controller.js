const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const getUsers = async (req, res = response, next) => {
  try {
    const { amount = 5, page = 0 } = req.query;
    const users = await User.find({})
      .skip(+page)
      .limit(+amount);
    if (!users) {
      return res.status(404).json({
        ok: false,
        message: "Users not found",
        data: {},
      });
    }
    res.json({
      ok: true,
      message: "Users found",
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res = response, next) => {
  try {
    const { name, lastname, email, password, role, profileImage } = req.body;
    const newUser = new User({
      name,
      lastname,
      email,
      password,
      role,
      profileImage,
    });

    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);

    await newUser.save();

    res.json({
      ok: true,
      message: "User created",
      data: newUser,
    });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const { name, lastname, profileImage, role } = req.body;

    const userModified = await User.findByIdAndUpdate(id, {
      name,
      lastname,
      profileImage,
      role,
    });

    res.json({
      ok: true,
      message: "User mofified",
      data: userModified,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = (req, res = response) => {
  res.json({
    ok: true,
    message: "DELETE USERS",
    data: {},
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
