const Role = require("../models/role.model");
const User = require("../models/user.model");

const roleValidation = async (role) => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`Role ${role} not valid`);
  }
};

const emailValidation = async (email) => {
  const existEmail = await User.findOne({ email });
  if (existEmail) {
    throw new Error(`Email ${email} already exists`);
  }
};

module.exports = {
  roleValidation,
  emailValidation,
};
