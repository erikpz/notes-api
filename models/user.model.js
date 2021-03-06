const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    required: true,
    enum: ["ADMIN_ROLE", "USER_ROLE"],
  },
});

userSchema.methods.toJSON = function () {
  const { __v, _id, password, ...newUser } = this.toObject();
  newUser.id = _id;
  return newUser;
};

const User = model("User", userSchema);

module.exports = User;
