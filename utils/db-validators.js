const Role = require("../models/role.model");

const roleValidation = async (role) => {
  const existsRole = await Role.findOne({ role });
  if (!existsRole) {
    throw new Error(`Role ${role} not valid`);
  }
};

module.exports = {
  roleValidation,
};
