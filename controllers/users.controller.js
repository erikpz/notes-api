const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");

const getUser = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
        data: {},
      });
    }
    res.json({
      ok: true,
      message: "User found",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

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
    const { id: idJwt } = req.userPayload;
    if (id === idJwt) {
      const { name, lastname, profileImage } = req.body;

      const userModified = await User.findByIdAndUpdate(
        id,
        {
          name,
          lastname,
          profileImage,
        },
        {
          new: true,
        }
      );

      res.json({
        ok: true,
        message: "User mofified",
        data: userModified,
      });
    } else {
      res.status(400).json({
        ok: true,
        message: "Only same user autenticated",
        data: {},
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const { id: idJwt } = req.userPayload;
    if (id === idJwt) {
      const userDeleted = await User.findByIdAndRemove(id);
      if (!userDeleted) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
          data: {},
        });
      }
      res.json({
        ok: true,
        message: "User deleted",
        data: userDeleted,
      });
    } else {
      res.status(400).json({
        ok: false,
        message: "User must be the same",
        data: {},
      });
    }
  } catch (err) {
    next(err);
  }
};

const deleteUserAdmin = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const userDeleted = await User.findByIdAndRemove(id);
    if (!userDeleted) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
        data: {},
      });
    }
    res.json({
      ok: true,
      message: "User deleted",
      data: userDeleted,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  deleteUserAdmin,
};
