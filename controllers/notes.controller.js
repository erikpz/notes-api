const { response } = require("express");

const getNotes = (req, res = response, next) => {
  try {
    console.log(req);
    res.json({
      ok: true,
    });
  } catch (err) {
    next(err);
  }
};

const createNote = (req, res = response, next) => {
  try {
    console.log(req);
    res.json({
      ok: true,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNotes,
  createNote
};
