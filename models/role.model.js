const { Schema, model } = require("mongoose");

const roleSchema = Schema({
  role: {
    type: String,
    required: true,
  },
});

roleSchema.methods.toJSON = function () {
  const { __v, ...newRole } = this.toObject();
  return newRole;
};

const Role = model("Role", roleSchema);

module.exports = Role;
