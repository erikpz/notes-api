const { Router } = require("express");

const notesRouter = Router();

notesRouter.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "NOTES GET",
  });
});

module.exports = notesRouter;
