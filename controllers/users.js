const { response } = require("express");

const getUsers = (req, res = response) => {
  const { id } = req.query;

  res.json({
    massage: "GET USERS",
    data: { id: id ?? "All users" },
  });
};

const createUser = (req, res = response) => {
  const { name, lastname, email, password } = req.body;

  res.json({
    massage: "POST USERS",
    data: { name, lastname, email, password },
  });
};

const updateUser = (req, res = response) => {
  const { id } = req.params;

  res.json({
    massage: "UPDATE USERS",
    data: { id },
  });
};

const deleteUser = (req, res = response) => {
  res.json({
    massage: "DELETE USERS",
    data: {},
  });
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
