const Note = require("../models/note.model");
const User = require("../models/user.model");

const emailValidation = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${email} already exists`);
  }
};

const userExists = async (id) => {
  const existsUser = await User.findOne({ _id: id });
  if (!existsUser) {
    throw new Error(`User ${id} not exists`);
  }
};

module.exports = {
  emailValidation,
  userExists,
};
