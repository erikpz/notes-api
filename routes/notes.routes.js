const { Router } = require("express");
const { check, param } = require("express-validator");
const {
  getNotes,
  createNote,
  getNote,
} = require("../controllers/notes.controller");
const { validateFields } = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");

const notesRouter = Router();

notesRouter.get("/", [validateJWT], getNotes);
notesRouter.get(
  "/:id",
  [validateJWT, param("id", "Id not valid").isMongoId(), validateFields],
  getNote
);
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
