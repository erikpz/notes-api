const { response } = require("express");
const Note = require("../models/note.model");

const getNotes = async (req, res = response, next) => {
  try {
    const { search = "" } = req.query;
    const regexSearch = new RegExp(search, "i");
    const notes = await Note.find({
      userId: req.userPayload.id,
      $or: [{ title: regexSearch }, { description: regexSearch }],
    });
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
    const note = await Note.findById(id).populate("userId", {
      name: true,
      lastname: true,
    });
    if (!note) {
      return res.status(404).json({
        ok: false,
        message: "Note not found",
        data: {},
      });
    }
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

const updateNote = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        ok: false,
        message: "Note not found",
        data: {},
      });
    }
    const noteUpdated = await Note.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    );
    res.json({
      ok: true,
      message: "Note updated",
      data: noteUpdated,
    });
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res = response, next) => {
  try {
    const { id } = req.params;
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({
        ok: false,
        message: "Note not found",
        data: {},
      });
    }
    const noteDeleted = await Note.findByIdAndDelete(id);
    res.json({
      ok: true,
      message: "Note deleted",
      data: noteDeleted,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getNote,
  getNotes,
  createNote,
  updateNote,
  deleteNote,
};
