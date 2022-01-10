const { Schema, model } = require("mongoose");

const roleSchema = Schema({
  role: {
    type: String,
    required: true,
  },
});

const Role = model("Role", roleSchema);

module.exports = Role;
