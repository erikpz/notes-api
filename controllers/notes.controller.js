const { response } = require("express");
const Note = require("../models/note.model");

const getNotes = async (req, res = response, next) => {
  try {
    const notes = await Note.find({ userId: req.userPayload.id });
    res.json({
      ok: true,
      message: "Your notes",
      data: notes,
    });
  } catch (err) {
    next(err);
  }
};

const getNote = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    console.log(id)
    const note = await Note.findById(id);
    res.json({
      ok: true,
      message: "Your note",
      data: note,
    });
  } catch (err) {
    next(err);
  }
};

const createNote = async (req, res = response, next) => {
  try {
    const { title, description, status } = req.body;
    const { id } = req.userPayload;
    const newNote = new Note({
      title,
      description,
      status,
      userId: id,
    });
    await newNote.save();
    res.status(201).json({
      ok: true,
      message: "Note created",
      data: newNote,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNote,
  getNotes,
  createNote,
};
