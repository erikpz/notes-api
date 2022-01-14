const { Router } = require("express");
const { check } = require("express-validator");
const { getNotes, createNote } = require("../controllers/notes.controller");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");

const notesRouter = Router();

notesRouter.get("/", [validateJWT], getNotes);
notesRouter.post(
  "/",
  [
    validateJWT,
    check("title").not().isEmpty(),
    check("description").not().isEmpty(),
    check("status", "Status required").not().isEmpty(),
    check("status", "Status not valid").isIn(["NEW", "IN_PROGRESS", "DONE"]),
    validateFields,
  ],
  createNote
);

module.exports = notesRouter;
