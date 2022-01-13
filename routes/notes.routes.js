const { Router } = require("express");
const { getNotes } = require("../controllers/notes.controller");

const notesRouter = Router();

notesRouter.get("/", getNotes);

module.exports = notesRouter;
