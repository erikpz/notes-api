const { Schema, model, SchemaTypes } = require("mongoose");

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["NEW", "IN_PROGRESS", "DONE"],
    default: "NEW",
  },
  userId: {
    type: SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

noteSchema.methods.toJSON = function () {
  const { __v, _id, ...newNote } = this.toObject();
  newNote.id = _id;
  return newNote;
};

const Note = model("Note", noteSchema);

module.exports = Note;
