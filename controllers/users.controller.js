const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const getUsers = (req, res = response) => {
  const { id } = req.query;

  res.json({
    ok: true,
    message: "GET USERS",
    data: { id: id ?? "All users" },
  });
};

const createUser = async (req, res = response) => {
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
    res.status(500).json({
      ok: false,
      message: "Server error",
      data: err,
    });
  }
};

const updateUser = (req, res = response) => {
  const { id } = req.params;

  res.json({
    ok: true,
    message: "UPDATE USERS",
    data: { id },
  });
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
