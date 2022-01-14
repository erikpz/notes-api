const { Router } = require("express");
const { check, param } = require("express-validator");
const {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const { noteExists } = require("../utils/db-validators");

const notesRouter = Router();

notesRouter.use(validateJWT);

notesRouter.get("/", getNotes);
notesRouter.get(
  "/:id",
  [param("id", "Invalid Mongo Id").isMongoId(), validateFields],
  getNote
);
notesRouter.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("description", "Description is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    check("status", "Status not valid").isIn(["NEW", "IN_PROGRESS", "DONE"]),
    validateFields,
  ],
  createNote
);
notesRouter.put(
  "/:id",
  [
    param("id", "Invalid Mongo Id").isMongoId(),
    check("description", "Description ir required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    check("status", "Status not valid").isIn(["NEW", "IN_PROGRESS", "DONE"]),
    validateFields,
  ],
  updateNote
);
notesRouter.delete(
  "/:id",
  [param("id", "Invalid Mongo Id").isMongoId(), validateFields],
  deleteNote
);

module.exports = notesRouter;
