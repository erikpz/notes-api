const mongoose = require('../config/db.config');

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
  date: Date,
});

const Note = mongoose.model("Note", noteSchema);

module.exports = { Note };
