const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const Note = require("../models/note.model");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);

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
    const { name, lastname, email, password, role } = req.body;
    let profileImage = req.files?.profileImage;

    if (!profileImage) {
      profileImage =
        "https://res.cloudinary.com/dsfx3uehr/image/upload/v1642885698/no-image_y3oxlz.jpg";
    }

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

    if (profileImage) {
      const { tempFilePath } = profileImage;
      const { secure_url } = await cloudinary.uploader.upload(tempFilePath, {
        folder: newUser.id,
      });

      newUser.profileImage = secure_url;
    }

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
      const { name, lastname, email } = req.body;

      const userModified = await User.findByIdAndUpdate(
        id,
        {
          name,
          lastname,
          email,
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
      await Note.deleteMany({ userId: idJwt });
      const userDeleted = await User.findByIdAndRemove(id);
      if (!userDeleted) {
        return res.status(404).json({
          ok: false,
          message: "User not found",
          data: {},
        });
      }
      return res.json({
        ok: true,
        message: "User deleted",
        data: userDeleted,
      });
    } else {
      return res.status(400).json({
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
    await Note.deleteMany({ userId: id });
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

const updatePassword = async (req, res = response, next) => {
  try {
    const { id } = req.userPayload;
    const { newPassword, password } = req.body;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
        data: {},
      });
    }

    const validOldPass = bcrypt.compareSync(password, user.password);

    if (!validOldPass) {
      return res.status(400).json({
        ok: false,
        message: "Old password not valid",
        data: {},
      });
    }

    const salt = bcrypt.genSaltSync();
    const newPassCryp = bcrypt.hashSync(newPassword, salt);
    user.password = newPassCryp;

    await user.save();

    res.json({
      ok: true,
      message: "Password updated",
      data: { user, newPassCryp },
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
  updatePassword,
};
